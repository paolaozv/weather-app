type AppStateType = {
  lat: number | null;
  long: number | null;
  error: string;
  woeid: null | number;
  location: null | string;
  language: string;
  loading: boolean;
  results: ResultsType[] | null;
  weather: TypeWeather[];
  firstLoading: boolean;
};

export type ResultsType = {
  title: string;
  woeid: number;
};

export type TypeWeather = {
  id: number;
  applicable_date: string;
  max_temp: number;
  min_temp: number;
  the_temp: number;
  weather_state_abbr: string;
};

type AppActionType = {
  type: string;
  payload: any;
};

const reducer = (state: AppStateType, action: AppActionType): AppStateType => {
  if (action.type === 'SET_LANGUAGE') {
    return { ...state, language: action.payload };
  }
  if (action.type === 'SET_ERROR') {
    return { ...state, error: action.payload };
  }
  if (action.type === 'SET_LATLONG') {
    return { ...state, lat: action.payload.lat, long: action.payload.long };
  }
  if (action.type === 'SET_WEATHER_ID') {
    return { ...state, woeid: action.payload.woeid, location: action.payload.title, firstLoading: false };
  }
  if (action.type === 'SET_LOADING') {
    return { ...state, loading: true };
  }
  if (action.type === 'SET_RESULTS') {
    return { ...state, loading: false, results: action.payload };
  }
  if (action.type === 'DISPLAY_WEATHER') {
    return { ...state, location: action.payload.title, weather: action.payload.consolidated_weather, loading: false };
  }
  if (action.type === 'SET_FIRST_LOADING') {
    return { ...state, firstLoading: true };
  }
  return state;
};

export default reducer;