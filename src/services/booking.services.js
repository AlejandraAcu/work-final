const { booking } = require('../models');

const getAllBookings = async () => {
  return await booking.findAll();
}

const createBookings = async (body) => {
  return await booking.create(body);
}

const getOneBookings = async (id) => {
  return await booking.findByPk(id);
}

const updateBookings = async (body, id) => {
  return await booking.update(
    body,
    { where: { id }, returning: true }
  );
}

const removeBookings = async (id) => {
  return await booking.destroy({ where: { id } });
}


module.exports = {
  getAllBookings,
  createBookings,
  getOneBookings,
  updateBookings,
  removeBookings,
}
