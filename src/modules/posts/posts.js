import { Router } from 'express';
import { authJwt } from '../../utils/passport';
import * as PostsController from './posts.controller';

const routes = new Router();

routes.get('/', authJwt, PostsController.getPosts);
routes.get('/:id', authJwt, PostsController.getPost);
routes.post('/add', authJwt, PostsController.addPosts);
routes.put('/edit/:id', authJwt, PostsController.editPosts);
routes.delete('/delete/:id', authJwt, PostsController.removePosts);

export default routes;
