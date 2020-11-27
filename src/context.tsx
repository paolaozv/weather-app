import React, { useReducer, createContext, FC, ReactNode, useContext, useEffect, useState, useCallback } from 'react';
import reducer from './reducer';
// languages
import en from './i18n/en.json';
import es from './i18n/es.json';
import de from './i18n/de.json';
// types
import { ResultsType } from './reducer';

const proxy = 'http://cors-anywhere.herokuapp.com/';

type AppProviderType = {
  children: ReactNode;
};

enum ActionType {
  SET_LANGUAGE = 'SET_LANGUAGE',
  SET_ERROR = 'SET_ERROR',
  SET_LATLONG = 'SET_LATLONG',
  SET_WEATHER_ID = 'SET_WEATHER_ID',
  SET_LOADING = 'SET_LOADING',
  SET_RESULTS = 'SET_RESULTS',
  DISPLAY_WEATHER = 'DISPLAY_WEATHER'
};

type ContextProps = {
  language: string;
  setLanguage: (lang: string) => void;
  translate: (key: string) => string;
  setQuery: (query: string) => void;
  query: string;
  results: ResultsType[] | null;
  loading: boolean;
  location: string | null;
  weather: any;
  searchQuery: () => void;
  getWeather: (id: number) => void;
};

const AppContext: React.Context<ContextProps> = createContext({} as ContextProps);
const localStorageLang = localStorage.getItem('language');
const initialState = {
  lat: null,
  long: null,
  error: '',
  woeid: null,
  location: null,
  loading: false,
  results: null,
  weather: [],
  language: localStorageLang ? localStorageLang : 'EN'
};
const latLong = {
  lat: 48.13743,
  long: 11.57549,
};

export const AppProvider: FC<AppProviderType> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [query, setQuery] = useState('');

  const getWeather = useCallback(async (woeid) => {
    dispatch({
      type: ActionType.SET_LOADING,
      payload: true
    });
    const url = `${proxy}https://www.metaweather.com/api/location/${woeid}/`;
    const response = await fetch(url);
    const weather = await response.json();
    const { consolidated_weather, title } = weather;
    dispatch({
      type: ActionType.DISPLAY_WEATHER,
      payload: { consolidated_weather, title }
    });
    console.log(weather);
  }, []);

  const getWeatherId = useCallback(async (lat, long) => {
    const url = `${proxy}https://www.metaweather.com/api/location/search/?lattlong=${lat},${long}`;
    const response = await fetch(url);
    const locations = await response.json();
    dispatch({
      type: ActionType.SET_WEATHER_ID,
      payload: { woeid: locations[0].woeid, location: locations[0].title }
    });
  }, []);

  const showPosition = useCallback((position: any) => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    dispatch({
      type: ActionType.SET_LATLONG,
      payload: { lat, long }
    });
    if (state.lat && state.long && !state.woeid) {
      getWeatherId(state.lat, state.long);
    }
    if (state.woeid) {
      getWeather(state.woeid);
    }
  }, [getWeatherId, state.woeid, getWeather, state.lat, state.long]);

  const showError = useCallback(() => {
    console.log('error');
    dispatch({
      type: ActionType.SET_ERROR,
      payload: 'errorAccessDenied'
    });
    if (!state.woeid) {
      getWeatherId(latLong.lat, latLong.long);
    }
    if (state.woeid) {
      getWeather(state.woeid);
    }
  }, [state.woeid, getWeatherId, getWeather]);

  useEffect(() => {
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else {
        dispatch({
          type: ActionType.SET_ERROR,
          payload: 'errorNotGeolocation'
        });
      }
    }
    getLocation();
  }, [showPosition, showError]);

  const setLanguage = (lang: string) => {
    localStorage.setItem('language', lang);
    dispatch({
      type: ActionType.SET_LANGUAGE,
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

  const searchQuery = async () => {
    // setQuery('');
    dispatch({
      type: ActionType.SET_LOADING,
      payload: true
    });
    const url = `${proxy}https://www.metaweather.com/api/location/search/?query=${query}`;
    const response = await fetch(url);
    const results = await response.json();
    dispatch({
      type: ActionType.SET_RESULTS,
      payload: results
    });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        setLanguage,
        translate,
        query,
        setQuery,
        searchQuery,
        getWeather
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};