const express = require('express');
const routerUser = require('./user.route');
const routerCity = require('./city.route');
const routerHotel = require('./hotel.route');
const routerImage = require('./image.route');
const routerBooking = require('./booking.route');
const routerReview = require('./review.route');
const router = express.Router();

// colocar las rutas aquí
router.use('/users', routerUser)
router.use('/cities', routerCity)
router.use('/hotels', routerHotel)
router.use('/images', routerImage)
router.use('/bookings', routerBooking)
router.use('/reviews', routerReview)

module.exports = router;
