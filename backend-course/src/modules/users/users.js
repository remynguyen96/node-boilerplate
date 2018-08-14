const { Router } = require('express');
const { authLocal } = require('../../utils/passport');
const UserController = require('./users.controller');

const routes = new Router();
routes.get('/', UserController.listUser);
routes.get('/verified-email/:token', UserController.verifiedEmail);
routes.post('/sign-up', UserController.signUp);
routes.post('/sign-in', authLocal, UserController.signIn);

module.exports = routes;

