type AppStateType = {
  lat: number | null;
  long: number | null;
  error: string;
  woeid: null | number;
  location: null | string;
  language: string;
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
    return { ...state, woeid: action.payload.woeid, location: action.payload.title }
  }
  return state;
};

export default reducer;