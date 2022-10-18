const { ApolloServer, gql } = require('apollo-server');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const { DB_URI, DB_NAME, JWT_SECRET } = process.env;

const getToken = (user) =>
  jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30 days' });

const getUserFromToken = async (token, db) => {
  if (!token) {
    return null;
  }
  const tokenData = jwt.verify(token, JWT_SECRET);
  if (!tokenData?.id) {
    return null;
  }
  return await db.collection('Users').findOne({ _id: ObjectId(tokenData.id) });
};

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Query {
    getUsers: [User!]!
    getAllReservations: [Reservation!]!
    getMyReservations: [Reservation!]!
    getCubicles: [Cubicle!]!
    getCubicleByID(id: ID!): Cubicle
  }
  type Mutation {
    signUp(input: SignUpInput!): AuthUser
    signIn(input: SignInInput!): AuthUser
    createReservation(input: CreateReservationInput!): Reservation!
    updateReservation(
      startTime: String!
      endTime: String!
      id: ID!
    ): Reservation!
    deleteReservation(id: ID!): Boolean
  }

  input SignUpInput {
    email: String!
    password: String!
    name: String!
    profilePic: String
    carrera: String!
    carnet: String!
  }
  input SignInInput {
    email: String!
    password: String!
  }
  input CreateReservationInput {
    cubicleID: ID!
    startTime: String!
    endTime: String!
    date: String!
    companions: [CreateCompanion!]!
  }
  input CreateCompanion {
    name: String!
    carnet: String!
    carrera: String!
  }

  type AuthUser {
    user: User!
    token: String!
  }
  type User {
    id: ID!
    name: String!
    email: String!
    profilePic: String
    carnet: String
    carrera: String
  }
  type Companion {
    name: String!
    carnet: String!
    carrera: String!
  }
  type Cubicle {
    id: ID!
    cubicleNumber: Int!
    maxCapacity: Int!
    minCapacity: Int!
    floor: String!
    sala: String!
    availability: Boolean!
  }
  type Reservation {
    id: ID!
    cubicleID: ID!
    startTime: String!
    endTime: String!
    createdBy: ID!
    companions: [Companion!]!
    date: String!
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    getUsers: async (_, __, { db }) => {
      const users = await db.collection('Users').find().toArray();
      return users;
    },
    getAllReservations: async (_, __, { db }) => {
      if (!user) {
        throw new Error('Authentication Error. Please sign in');
      }
      return await db.collection('Reservations').find().toArray();
    },
    getMyReservations: async (_, __, { db, user }) => {
      if (!user) {
        throw new Error('Authentication Error. Please sign in');
      }
      const result = await db
        .collection('Reservations')
        .find({ createdBy: user._id })
        .toArray();

      return result;
    },
    getCubicles: async (_, __, { db, user }) => {
      return await db.collection('Cubicles').find().toArray();
    },
    getCubicleByID: async (_, { id }, { db, user }) => {
      if (!user) {
        throw new Error('Authentication Error. Please sign in');
      }
      return await db.collection('Cubicles').findOne({ _id: ObjectId(id) });
    },
  },
  Mutation: {
    signUp: async (_, { input }, { db }) => {
      const hashedPassword = bcrypt.hashSync(input.password);
      const user = { ...input, password: hashedPassword };
      // Save to database
      const result = await db.collection('Users').insertOne(user);
      const authUser = await db
        .collection('Users')
        .findOne({ _id: result.insertedId });
      return {
        user: authUser,
        token: getToken(authUser),
      };
    },
    signIn: async (_, { input }, { db }) => {
      const user = await db.collection('Users').findOne({ email: input.email });
      const isPasswordCorrect =
        user && bcrypt.compareSync(input.password, user.password);
      // Check Email and Password
      if (!user || !isPasswordCorrect) {
        throw new Error('Invalid credentials!');
      }

      return {
        user: user,
        token: getToken(user),
      };
    },
    createReservation: async (_, { input }, { db, user }) => {
      if (!user) {
        throw new Error('Authentication Error. Please sign in');
      }
      const reservation = { ...input, createdBy: user._id };
      const result = await db.collection('Reservations').insertOne(reservation);
      const insertedReservation = await db
        .collection('Reservations')
        .findOne({ _id: result.insertedId });
      // Change availability in Cubicle from True to False
      const availability = false;
      await db
        .collection('Cubicles')
        .updateOne(
          { _id: ObjectId(insertedReservation.cubicleID) },
          { $set: { availability } }
        );
      return insertedReservation;
    },
    updateReservation: async (_, { id, startTime, endTime }, { db, user }) => {
      if (!user) {
        throw new Error('Authentication Error. Please sign in');
      }

      await db
        .collection('Reservations')
        .updateOne({ _id: ObjectId(id) }, { $set: { startTime, endTime } });

      return await db.collection('Reservations').findOne({ _id: ObjectId(id) });
    },
    deleteReservation: async (_, { id }, { db, user }) => {
      if (!user) {
        throw new Error('Authentication Error. Please sign in');
      }
      // Get Reservation from ID
      const reservation = await db
        .collection('Reservations')
        .findOne({ _id: ObjectId(id) });
      // Change availability in Cubicle from False to True
      const availability = true;
      await db
        .collection('Cubicles')
        .updateOne(
          { _id: ObjectId(reservation.cubicleID) },
          { $set: { availability } }
        );
      // Delete Reservation
      const result = await db
        .collection('Reservations')
        .deleteOne({ _id: ObjectId(id) });

      if (result.deletedCount === 1) {
        return true;
      } else {
        return false;
      }
    },
  },
  User: {
    id: ({ _id, id }) => _id || id,
  },
  Reservation: {
    id: ({ _id, id }) => _id || id,
  },
  Cubicle: {
    id: ({ _id, id }) => _id || id,
  },
};

const start = async () => {
  const client = new MongoClient(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  await client.connect();
  const db = client.db(DB_NAME);

  // The ApolloServer constructor requires two parameters: your schema
  // definition and your set of resolvers.
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const user = await getUserFromToken(req.headers.authorization, db);
      return {
        db,
        user,
      };
    },
  });

  // The `listen` method launches a web server.
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

start();
