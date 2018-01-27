import { Router } from 'express';
import { authJwt, authLocal } from '../../utils/passport';
import * as UserController from './users.controller';

const routes = new Router();
routes.post('/reset-password', UserController.resetPassword);
routes.get('/verified-email/:token', UserController.verifiedEmail);
routes.get('/update-password/:token', UserController.updatePassword);
routes.post('/sign-up', UserController.signUp);
routes.post('/sign-in', authLocal, UserController.signIn);
routes.get('/profile/:id', authJwt, UserController.getProfile);
routes.patch('/profile/:id', authJwt, UserController.editProfile);
routes.delete('/profile/:id', authJwt, UserController.removeProfile);

export default routes;
