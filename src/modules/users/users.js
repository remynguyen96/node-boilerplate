import { Router } from 'express';
import { authLocal } from '../../utils/passport';
import * as UserController from './users.controller';

const routes = new Router();
routes.get('/', UserController.listUser);
routes.get('/verified-email/:token', UserController.verifiedEmail);
routes.post('/sign-up', UserController.signUp);
routes.post('/sign-in', authLocal, UserController.signIn);

export default routes;
