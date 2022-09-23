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
  type Mutation {
    signUp(input: SignUpInput!): AuthUser
    signIn(input: SignInInput!): AuthUser
  }

  input SignUpInput {
    email: String!
    password: String!
    name: String!
    profilePic: String
  }
  input SignInInput {
    email: String!
    password: String!
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
  }
  type Query {
    users: [User]!
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    users: () => users,
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
  },
  User: {
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
