import { Router } from 'express';
import * as AuthController from './auth.controller';
import { authLocal } from './passport';

const routes: Router = Router();
routes.post('/sign-up', AuthController.signUp);

routes.post('/verified-email/:token', AuthController.verifiedEmail);

// routes.post('/reset-password', AuthController.resetPassword);

// routes.post('/update-password/:token', AuthController.updatePassword);

routes.post('/sign-in', authLocal, AuthController.signIn);

// routes.post('/refresh-token', authLocal, AuthController.refreshToken);

export default routes;