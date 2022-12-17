import { createContext, useState } from 'react';

export const themeContext = createContext({});

export default function UserContextProvider({ children }) {
  const [theme, setTheme] = useState({});
  return (
    <themeContext.Provider value={{ theme, setTheme }}>
      {children}
    </themeContext.Provider>
  );
}
