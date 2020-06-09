const express = require('express');
const routes = express.Router();

const UserController = require('./Controllers/UserController')
const PostController = require('./Controllers/PostController')

// routers users 
routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.delete('/users/:user_id', UserController.delete);
routes.put('/users/:user_id', UserController.update);
routes.post('/users/login', UserController.login);
// routers posts 
routes.get('/posts', PostController.index);
routes.get('/users/:user_id/posts', PostController.findByUser);
routes.post('/users/:user_id/post', PostController.store);
routes.delete('/users/:post_id/post', PostController.delete);
routes.put('/users/:post_id/post', PostController.update);

routes.get('/', (req, res) => {
    return res.json({ msg: ' started api' })
})

module.exports = routes;