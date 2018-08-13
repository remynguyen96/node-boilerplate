const FETCH_LOGIN = 'FETCH_LOGIN';
const FETCH_LOGIN_SUCCESS = 'FETCH_LOGIN_SUCCESS';
const FETCH_LOGIN_ERROR = 'FETCH_LOGIN_ERROR';
const IS_AUTHENTICATE = 'IS_AUTHENTICATE';

const FETCH_REGISTER = 'FETCH_REGISTER';
const FETCH_REGISTER_SUCCESS = 'FETCH_REGISTER_SUCCESS';
const FETCH_REGISTER_ERROR = 'FETCH_REGISTER_ERROR';

const FETCH_POSTS = 'FETCH_POSTS';
const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
const FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR';




// * Login
const fetch_login = () => ({
  type: FETCH_LOGIN,
});

const fetch_login_success = (payload) => ({
  type: FETCH_LOGIN_SUCCESS,
  payload,
});

const fetch_login_error = (payload) => ({
  type: FETCH_LOGIN_ERROR,
  payload,
});

const is_authenticate = (payload) => ({
  type: IS_AUTHENTICATE,
  payload,
});

// * Register
const fetch_register = () => ({
  type: FETCH_REGISTER,
});

const fetch_register_success = (payload) => ({
  type: FETCH_REGISTER_SUCCESS,
  payload,
});

const fetch_register_error = (payload) => ({
  type: FETCH_REGISTER_ERROR,
  payload,
});

// * Posts
const fetch_posts = () => ({
  type: FETCH_POSTS,
});

const fetch_posts_success = (payload) => ({
  type: FETCH_POSTS_SUCCESS,
  payload,
});

const fetch_posts_error = (payload) => ({
  type: FETCH_POSTS_ERROR,
  payload,
});

export { 
  FETCH_LOGIN,
  FETCH_LOGIN_ERROR,
  FETCH_LOGIN_SUCCESS,
  fetch_login,
  fetch_login_error,
  fetch_login_success,

  IS_AUTHENTICATE,
  is_authenticate,

  FETCH_REGISTER,
  FETCH_REGISTER_ERROR,
  FETCH_REGISTER_SUCCESS,
  fetch_register,
  fetch_register_error,
  fetch_register_success,

  FETCH_POSTS,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  fetch_posts,
  fetch_posts_error,
  fetch_posts_success,
}