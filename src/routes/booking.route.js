const { getAll, create, getOne, remove, update } = require('../controllers/booking.controllers');
const express = require('express');
const { verifyJWT } = require('../utils/verifyJWT');

const routerBooking = express.Router();

routerBooking.route('/')
  .get(verifyJWT, getAll)
  .post(verifyJWT, create);

routerBooking.route('/:id')
  .get(verifyJWT, getOne)
  .delete(verifyJWT, remove)
  .put(verifyJWT, update);

module.exports = routerBooking;