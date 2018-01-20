import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  SET_AUTH_REDIRECT_PATH
} from './types';
import axios from 'axios';

export const authStart = () => {
  return {
    type: AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: AUTH_SUCCESS,
    idToken: token,
    userId
  };
};

export const authFail = error => {
  return {
    type: AUTH_FAIL,
    error
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true
    };
    const req = async () => {
      try {
        let url =
          'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDd24SCQ1nkN3Tk3XPiRgK7sC56puUuJ2U';
        if (!isSignup) {
          url =
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDd24SCQ1nkN3Tk3XPiRgK7sC56puUuJ2U';
        }
        const res = await axios.post(url, authData);
        const expirationDate = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        );
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', res.data.localId);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      } catch (err) {
        console.log(err.response.data.error);
        dispatch(authFail(err.response.data.error));
      }
    };
    req();
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: SET_AUTH_REDIRECT_PATH,
    path
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            expirationDate.getTime() - new Date().getTime() / 1000
          )
        );
      }
    }
  };
};
