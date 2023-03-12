import { gql } from '@apollo/client';

const SIGN_UP_MUTATION = gql`
  mutation signUp($email: String!, $password: String!, $name: String!) {
    signUp(input: { email: $email, password: $password, name: $name }) {
      token
      user {
        id
        name
      }
    }
  }
`;

const SIGN_IN_MUTATION = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      token
      user {
        name
        email
      }
    }
  }
`;

const DELETE_RESERVATION_MUTATION = gql`
  mutation deleteReservation($id: ID!) {
    deleteReservation(id: $id)
  }
`;
