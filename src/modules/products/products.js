import {Router} from 'express';
import * as ProductController from './products.controller';
const routes = new Router();

routes.get('/', ProductController.getProducts);
routes.get('/:id', ProductController.getProduct);
routes.post('/add', ProductController.addProducts);
routes.put('/edit/:id', ProductController.editProducts);
routes.delete('/delete/:id', ProductController.removeProducts);

export default routes;
