import { Router } from 'express';
import Users from './users/users';
import Posts from './posts/posts';
import Products from './products/products';
import Roles from './roles/roles';

const routes = new Router();
routes.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Access-Token, X-Refresh-Token');
    next();
});
routes.use('/users', Users);
routes.use('/posts', Posts);
routes.use('/products', Products);
routes.use('/roles', Roles);

export default routes;
