import { Router } from 'express';
import * as PostController from './posts.controller';
import { authJwt } from '../../utils/passport';
const routes = new Router();

routes.get('/', authJwt, PostController.getProducts);
// routes.get('/:id', authJwt, PostController.getProduct);
// routes.post('/add', authJwt, PostController.addProducts);
// routes.put('/edit/:id', authJwt, PostController.editProducts);
// routes.delete('/delete/:id', authJwt, PostController.removeProducts);

export default routes;
