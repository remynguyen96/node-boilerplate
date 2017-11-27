import {Router} from 'express';
import Auth from './auth';
import Posts from './posts';
import Products from './products';

const routes = new Router();
// routes.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     next();
// });
routes.use('/auth', Auth);
routes.use('/posts', Posts);
routes.use('/products', Products);

export default routes;
