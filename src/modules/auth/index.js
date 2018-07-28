import { Router } from 'express';
import * as AuthController from './auth.controller';
import { authJwt, authLocal } from './passport';

const routes = new Router();

// routes.post('/sign-up', authJwt, BlogController.uploadImage);
routes.post('/sign-up', AuthController.signUp);

routes.post('/verified-email/:token', AuthController.verifiedEmail);

routes.post('/reset-password', AuthController.resetPassword);

routes.post('/update-password/:token', AuthController.updatePassword);

routes.post('/sign-in', authLocal, AuthController.signIn);

export default routes;
