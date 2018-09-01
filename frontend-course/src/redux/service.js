import { 
  fetch_posts, fetch_posts_error, fetch_posts_success,
  fetch_login, fetch_login_error, fetch_login_success,
  fetch_register, fetch_register_error, fetch_register_success,
  is_authenticate, 
 } from './actions';

export const TOKEN = 'token';
export const URL_SERVER = process.env.URL_SERVICE;
const URL_SERVER_API = `${URL_SERVER}/api`;

const fetchApi = (url, method = 'GET', body = null) => {
  const infoRequest = {
    method,
    mode: 'cors',
    headers: new Headers({
      'Content-Type': 'application/json',
    })
  };
  if (method === 'GET' || method === 'DELETE') {
    return fetch(url, infoRequest);
  }
  return fetch(url, { ...infoRequest, body: JSON.stringify(body)});
};

export const isAuth = () => {
  return (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token && token.length > 0) {
      dispatch(is_authenticate(true));
    } else {
      dispatch(is_authenticate(false));
    }
  }
};

export const logoutPage = () => {
  return (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      window.localStorage.removeItem(TOKEN);
      dispatch(is_authenticate(false));
    }
  }
};

const setAuthenticate = (token, dispatch) => {
  window.localStorage.setItem(TOKEN, token);
  dispatch(is_authenticate(true));
};

export const fetchPosts = () => {
  return async (dispatch) => {
    try {
      dispatch(fetch_posts());
      const url = `${URL_SERVER_API}/posts`;
      const resPosts = await fetchApi(url);
      const getPosts = await resPosts.json();
      dispatch(fetch_posts_success(getPosts));
    } catch (error) {
      dispatch(fetch_posts_error(error));
    }
  }
};

export const loginForm = (info) => {
  return async (dispatch) => {
    try {
      dispatch(fetch_login());
      const url = `${URL_SERVER_API}/users/sign-in`;
      const resUsers = await fetchApi(url, 'POST', info);
      const getLogin = await resUsers.json();
      setAuthenticate(getLogin.accessToken, dispatch)
      dispatch(fetch_login_success(getLogin));
    } catch (error) {
      dispatch(fetch_login_error('Email or password is not correct!'));
    }
  }
};

export const registerForm = (info) => {
  return async (dispatch) => {
    try {
      dispatch(fetch_register());
      const url = `${URL_SERVER_API}/users/sign-up`;
      const resUsers = await fetchApi(url, 'POST', info);
      const getRegister = await resUsers.json();
      const { errors, token } = getRegister;
      if (errors && Array.isArray(errors)) {
        const { message } = errors[0];
        dispatch(fetch_register_error(message));
      } else {
        setAuthenticate(token, dispatch)
        dispatch(fetch_register_success(getRegister));
      }
    } catch (err) {
      dispatch(fetch_register_error(err));
    }
  }
};