import {Router} from 'express';
// import { authJwt, authLocal} from '../../config/passport'
import * as UserController from './users.controller';
const routes = new Router();

// routes.post('/sign-up', authJwt, UserController.signUp);
routes.post('/sign-up', UserController.signUp);
routes.post('/verified-email/:token', UserController.verifiedEmail);
routes.post('/reset-password', UserController.resetPassword);
routes.post('/update-password/:token', UserController.updatePassword);
// routes.post('/sign-in', authLocal, UserController.signIn);
routes.post('/sign-in', UserController.signIn);
// routes.post('/refresh-token', authLocal, UserController.refreshToken);
routes.post('/refresh-token', UserController.refreshToken);
routes.put('/profile/:id', UserController.editProfile);
// routes.delete('/:id', UserController.removeUser);

export default routes;
