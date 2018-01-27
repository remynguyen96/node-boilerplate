import { Router } from 'express';
import * as PostController from './posts.controller';
import { authJwt } from '../../utils/passport';
const routes = new Router();

routes.get('/', authJwt, PostController.getPosts);

export default routes;
