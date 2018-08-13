import { 
  fetch_posts, fetch_posts_error, fetch_posts_success,
  fetch_login, fetch_login_error, fetch_login_success,
  fetch_register, fetch_register_error, fetch_register_success,
 } from './actions';

export const TOKEN = 'token';
export const URL_SERVER = 'http://localhost:4500';
const URL_SERVER_API = `${URL_SERVER}/api`;

const fetchApi = (url, method = 'GET', body = null) => {
  const infoRequest = {
    method,
    mode: 'cors',
    headers: new Headers({
      'Content-Type': 'application/json',
    })
  }
  if (method === 'GET' || method === 'DELETE') {
    return fetch(url, infoRequest);
  }
  return fetch(url, { ...infoRequest, body: JSON.stringify(body)});
}

export const isAuth = () => {
  const token = window.localStorage.getItem(TOKEN);
  if (token && token.length > 0) {
    return true;
  }
  return false;
}

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
}

export const loginForm = (info) => {
  return async (dispatch) => {
    try {
      dispatch(fetch_login());
      const url = `${URL_SERVER_API}/users/sign-in`;
      const resUsers = await fetchApi(url, 'POST', info);
      const getLogin = await resUsers.json();
      window.localStorage.setItem(TOKEN, getLogin.accessToken);
      dispatch(fetch_login_success(getLogin));
    } catch (error) {
      dispatch(fetch_login_error('Email or password is not correct!'));
    }
  }
}

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
        dispatch(fetch_register_success(getRegister));
        window.localStorage.setItem(TOKEN, token);
      }
    } catch (err) {
      dispatch(fetch_register_error(err));
    }
  }
}