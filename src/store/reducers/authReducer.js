import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  SET_AUTH_REDIRECT_PATH
} from '../actions/types';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
      };
    case AUTH_FAIL:
      return {
        error: action.error,
        loading: false
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null
      };
    case SET_AUTH_REDIRECT_PATH:
      return {
        ...state,
        authRedirectPath: action.path
      };
    default:
      return state;
  }
};

export default reducer;
