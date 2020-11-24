type AppStateType = {
  language: string;
};

type AppActionType = {
  type: string;
  payload: string;
};

const reducer = (state: AppStateType, action: AppActionType): AppStateType => {
  if (action.type === 'SET_LANGUAGE') {
    return { ...state, language: action.payload }
  }
  return state;
};

export default reducer;