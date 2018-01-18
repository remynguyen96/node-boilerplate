import {Router} from 'express';
import {authJwt, authLocal} from '../../config/passport';
import * as UserController from './users.controller';

const routes = new Router();
routes.post('/sign-in', authLocal, UserController.signIn);

routes.post('/sign-up', UserController.signUp);

routes.post('/verified-email/:token', authJwt, UserController.verifiedEmail);

routes.post('/reset-password', UserController.resetPassword);

routes.post('/update-password/:token', authJwt, UserController.updatePassword);

routes.post('/refresh-token', authLocal, UserController.refreshToken);

routes.put('/profile/:id', authJwt, UserController.editProfile);

routes.delete('/:id', authJwt, UserController.removeUser);

export default routes;
