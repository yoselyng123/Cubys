import { createContext, useState } from 'react';
import * as Localisation from 'expo-localization';
import { I18n } from 'i18n-js';
import { en, es } from '../assets/languages/localization';

export const languageContext = createContext(null);

export default function LanguageContextProvider({ children }) {
  const [locale, setLocale] = useState(Localisation.locale);

  const i18n = new I18n();
  i18n.enableFallback = true;
  i18n.translations = { en, es };
  i18n.locale = locale;

  return (
    <languageContext.Provider
      value={{
        setLocale,
        locale,
        i18n,
      }}
    >
      {children}
    </languageContext.Provider>
  );
}
