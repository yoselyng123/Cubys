/* APOLLO SERVER */
import { gql } from '@apollo/client';

const GET_CUBICLES = gql`
  query getCubicles {
    getCubicles {
      id
      sala
      cubicleNumber
      floor
    }
  }
`;

const GET_RESERVATIONS_BY_STATUS = gql`
  query getMyReservationsByStatus($completed: Boolean!) {
    getMyReservationsByStatus(completed: $completed) {
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

const GET_ALL_RESERVATIONS_BY_STATUS = gql`
  query getReservationsByStatus($completed: Boolean!) {
    getReservationsByStatus(completed: $completed) {
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

const GET_RESERVATIONS_BY_DATE = gql`
  query getReservationsByDate($date: String!) {
    getReservationsByDate(date: $date) {
      id
      startTime
      endTime
      date
      cubicleID
      companions {
        carnet
        carrera
        name
      }
      completed
    }
  }
`;

const GET_RESERVATIONS = gql`
  query getMyReservations {
    getMyReservations {
      id
      cubicleID
      createdBy
      startTime
      endTime
      date
      companions {
        name
        carrera
        carnet
      }
      completed
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
      maxCapacity
      minCapacity
    }
  }
`;

export {
  GET_CUBICLES,
  GET_RESERVATIONS_BY_STATUS,
  GET_ALL_RESERVATIONS_BY_STATUS,
  GET_RESERVATIONS_BY_DATE,
  GET_RESERVATIONS,
  GET_CUBICLE_BY_ID,
};
