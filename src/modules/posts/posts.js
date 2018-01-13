import {Router} from 'express';
import * as PostController from './posts.controller';
const routes = new Router();

routes.get('/', PostController.getProducts);

export default routes;
