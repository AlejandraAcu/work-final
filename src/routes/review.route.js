const { getAll, create, getOne, remove, update } = require('../controllers/review.controllers');
const express = require('express');
const { verifyJWT } = require('../utils/verifyJWT');

const routerReview = express.Router();

routerReview.route('/')
  .get(getAll)
  .post(verifyJWT, create);

routerReview.route('/:id')
  .get(verifyJWT, getOne)
  .delete(verifyJWT, remove)
  .put(verifyJWT, update);

module.exports = routerReview;