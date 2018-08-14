const { Router } = require('express');
const { authJwt } = require('../../utils/passport');
const PostsController = require('./posts.controller');

const routes = new Router();

routes.get('/', PostsController.getPosts);
routes.get('/:slug', PostsController.getPost);
routes.post('/add', authJwt, PostsController.addPosts);
routes.put('/edit/:id', authJwt, PostsController.editPosts);
routes.delete('/delete/:id', authJwt, PostsController.removePosts);

module.exports = routes;
