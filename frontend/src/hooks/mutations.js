import { gql } from '@apollo/client';

const DELETE_RESERVATION_MUTATION = gql`
  mutation deleteReservation($id: ID!) {
    deleteReservation(id: $id)
  }
`;

const UPDATE_RESERVATION_STATUS = gql`
  mutation updateReservationStatus($id: ID!, $completed: Boolean!) {
    updateReservationStatus(id: $id, completed: $completed) {
      id
      createdBy
      startTime
      endTime
      date
      cubicleID
      completed
      companions {
        carnet
        carrera
        name
      }
    }
  }
`;

const UPDATE_USER_MUTATION = gql`
  mutation updateUser($id: ID!, $password: String!) {
    updateUser(id: $id, password: $password) {
      token
      user {
        id
        name
        email
        carrera
        carnet
        role
        joined
      }
    }
  }
`;

const CREATE_RESERVATION = gql`
  mutation createReservation(
    $startTime: String!
    $endTime: String!
    $cubicleID: ID!
    $companions: [CreateCompanion!]!
    $date: String!
    $completed: Boolean
  ) {
    createReservation(
      input: {
        startTime: $startTime
        endTime: $endTime
        cubicleID: $cubicleID
        date: $date
        companions: $companions
        completed: $completed
      }
    ) {
      id
      cubicleID
      startTime
      endTime
      date
      createdBy
      completed
      companions {
        name
        carnet
        carrera
      }
    }
  }
`;

export {
  DELETE_RESERVATION_MUTATION,
  UPDATE_RESERVATION_STATUS,
  UPDATE_USER_MUTATION,
  CREATE_RESERVATION,
};
