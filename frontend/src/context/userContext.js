import { createContext, useState } from 'react';

export const userContext = createContext(null);

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [myReservations, setMyReservations] = useState([]);
  const [lockStatus, setLockStatus] = useState('Cerrado');
  const [cubiclesList, setCubiclesList] = useState([]);
  const [doorsList, setDoorsList] = useState([]);

  return (
    <userContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        myReservations,
        setMyReservations,
        lockStatus,
        setLockStatus,
        cubiclesList,
        setCubiclesList,
        setDoorsList,
        doorsList,
      }}
    >
      {children}
    </userContext.Provider>
  );
}
