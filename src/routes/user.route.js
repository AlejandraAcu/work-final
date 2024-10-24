const { getAll, create, getOne, remove, update, logged, login } = require('../controllers/user.controllers');
const express = require('express');
const hashPassword = require('../middlewares/hashPassword.middlewares');
const sessionJWT = require('../middlewares/sessionJWT.middlewares');
const loginMiddlewares = require('../middlewares/login.middleware');
const { verifyJWT } = require('../utils/verifyJWT');

const routerUser = express.Router();

routerUser.route('/')
    .get(verifyJWT, getAll)
    .post(hashPassword, create);

routerUser.route('/login')
    .post(loginMiddlewares, sessionJWT, login)

routerUser.route('/me')
    .get(verifyJWT, logged)

routerUser.route('/:id')
    .get(verifyJWT, getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = routerUser;