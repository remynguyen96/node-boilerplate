import { Router } from 'express';
import { authJwt } from '../../utils/passport';
import * as ProductController from './products.controller';

const routes = new Router();

routes.get('/', authJwt, ProductController.getProducts);
routes.get('/:id', authJwt, ProductController.getProduct);
routes.post('/add', authJwt, ProductController.addProducts);
routes.put('/edit/:id', authJwt, ProductController.editProducts);
routes.delete('/delete/:id', authJwt, ProductController.removeProducts);

export default routes;
