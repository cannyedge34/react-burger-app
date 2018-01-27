import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  SET_AUTH_REDIRECT_PATH,
  AUTH_LOGOUT,
  AUTH_INITIATE_LOGOUT,
  AUTH_CHECK_TIMEOUT,
  AUTH_USER,
  AUTH_CHECK_STATE
} from './types';

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
  // these actions are executed in auth sagas
  // localStorage.removeItem('token');
  // localStorage.removeItem('expirationDate');
  // localStorage.removeItem('userId');
  return {
    type: AUTH_INITIATE_LOGOUT
  };
};

export const logoutSucceed = () => {
  return {
    type: AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return {
    type: AUTH_CHECK_TIMEOUT,
    expirationTime
  };
};

export const auth = (email, password, isSignup) => {
  // these actions are executed in auth sagas
  // return dispatch => {
  //   dispatch(authStart());
  //   const authData = {
  //     email,
  //     password,
  //     returnSecureToken: true
  //   };
  //   const req = async () => {
  //     try {
  //       let url =
  //         'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDd24SCQ1nkN3Tk3XPiRgK7sC56puUuJ2U';
  //       if (!isSignup) {
  //         url =
  //           'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDd24SCQ1nkN3Tk3XPiRgK7sC56puUuJ2U';
  //       }
  //       const res = await axios.post(url, authData);
  //       const expirationDate = new Date(
  //         new Date().getTime() + res.data.expiresIn * 1000
  //       );
  //       localStorage.setItem('token', res.data.idToken);
  //       localStorage.setItem('expirationDate', expirationDate);
  //       localStorage.setItem('userId', res.data.localId);
  //       dispatch(authSuccess(res.data.idToken, res.data.localId));
  //       dispatch(checkAuthTimeout(res.data.expiresIn));
  //     } catch (err) {
  //       console.log(err.response.data.error);
  //       dispatch(authFail(err.response.data.error));
  //     }
  //   };
  //   req();
  // };
  return {
    type: AUTH_USER,
    email,
    password,
    isSignup
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: SET_AUTH_REDIRECT_PATH,
    path
  };
};

export const authCheckState = () => {
  // these actions are executed in auth sagas
  // return dispatch => {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     dispatch(logout());
  //   } else {
  //     const expirationDate = new Date(localStorage.getItem('expirationDate'));
  //     if (expirationDate <= new Date()) {
  //       dispatch(logout());
  //     } else {
  //       const userId = localStorage.getItem('userId');
  //       dispatch(authSuccess(token, userId));
  //       dispatch(
  //         checkAuthTimeout(
  //           expirationDate.getTime() - new Date().getTime() / 1000
  //         )
  //       );
  //     }
  //   }
  // };
  return {
    type: AUTH_CHECK_STATE
  };
};
