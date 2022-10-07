import { createContext, useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';

export const userContext = createContext(null);

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [name, setName] = useState('Yoselyn');

  const GET_ACTIVE_USER = gql`
    query getActiveUser($token: String!) {
      getActiveUser(name: $name) {
        user {
          name
          email
        }
      }
    }
  `;

  const GET_USERS = gql`
    query getUsers {
      getUsers {
        user {
          name
          email
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return null;
  if (error) console.log(error);

  console.log(data);

  return (
    <userContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
      }}
    >
      {children}
    </userContext.Provider>
  );
}
