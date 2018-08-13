import { combineReducers } from 'redux';
import {
  FETCH_LOGIN_ERROR,
  FETCH_LOGIN_SUCCESS,

  FETCH_REGISTER_ERROR,
  FETCH_REGISTER_SUCCESS,

  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
} from './actions';


const initialize = {
  users: null,
  error_login: null,
  error_register: null,
  posts: null,
  error_posts: null,
};

const reducerApp = (state = initialize, action) => {
    switch (action.type) {
      case FETCH_LOGIN_SUCCESS:
        return Object.assign({}, state, {
          users: action.payload
        });
      case FETCH_LOGIN_ERROR:
        return Object.assign({}, state, {
          error_login: action.payload
        });  
      case FETCH_POSTS_SUCCESS:
        return Object.assign({}, state, {
          posts: action.payload
        });  
      case FETCH_POSTS_ERROR:
        return Object.assign({}, state, {
          error_posts: action.payload
        });  
      case FETCH_REGISTER_ERROR:
        return Object.assign({}, state, {
          error_register: action.payload
        });  
      case FETCH_REGISTER_SUCCESS:
        return Object.assign({}, state, {
          users: action.payload
        });  
      default:
        return state;
    }
}

export default combineReducers({
  application: reducerApp,
});