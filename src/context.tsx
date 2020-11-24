import React, { useReducer, createContext, FC, ReactNode, useContext } from 'react';
import reducer from './reducer';
// languages
import en from './i18n/en.json';
import es from './i18n/es.json';
import de from './i18n/de.json';

type AppProviderType = {
  children: ReactNode;
};

enum LangActionType {
  SET_LANGUAGE = 'SET_LANGUAGE'
};

type ContextProps = {
  language: string;
  setLanguage: (lang: string) => void;
  translate: (key: string) => string;
};

const AppContext: React.Context<ContextProps> = createContext({} as ContextProps);

const localStorageLang = localStorage.getItem('language');
const initialState = {
  language: localStorageLang ? localStorageLang : 'EN'
};

export const AppProvider: FC<AppProviderType> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setLanguage = (lang: string) => {
    localStorage.setItem('language', lang);
    dispatch({
      type: LangActionType.SET_LANGUAGE,
      payload: lang
    });
  };

  const translate = (key: string) => {
    const { language } = state;
    let langData: { [key: string]: string } = {};

    if (language === 'EN') {
      langData = en;
    } else if (language === 'ES') {
      langData = es;
    } else if (language === 'DE') {
      langData = de;
    }

    return langData[key];
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        setLanguage,
        translate
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};