import { createContext, useState } from 'react';

export const languageContext = createContext(null);

export default function languageContextProvider({ children }) {
  const [language, setLanguage] = useState(null);

  return (
    <languageContext.Provider
      value={{
        language,
        setLanguage,
      }}
    >
      {children}
    </languageContext.Provider>
  );
}
