/* APOLLO SERVER */
import { gql } from '@apollo/client';

const GET_RESERVATIONS = gql`
  query getMyReservations {
    getMyReservations {
      id
      cubicleID
      createdBy
      startTime
      endTime
    }
  }
`;

const GET_CUBICLE_BY_ID = gql`
  query getCubiclebyID($id: ID!) {
    getCubicleByID(id: $id) {
      id
      cubicleNumber
      floor
      sala
      availability
      maxCapacity
      minCapacity
    }
  }
`;

const GET_CUBICLES = gql`
  query getCubicles {
    getCubicles {
      sala
      cubicleNumber
      availability
    }
  }
`;
