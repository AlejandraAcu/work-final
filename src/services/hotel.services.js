const { hotel, city, image, bookings, review } = require('../models');

const getAllHotel = async () => {
  return await hotel.findAll({ include: [city, image] });
};

const createHotel = async (body) => {
  return await hotel.create(body)
}

const getOneHotel = async (id) => {
  return await hotel.findByPk(id, { include: [city, image] })
}

const updateHotel = async (body, id) => {
  return await hotel.update(body, { where: { id }, returning: true });
};

const removeHotel = async (id) => {
  return await hotel.destroy({ where: { id } });
};

module.exports = {
  getAllHotel,
  createHotel,
  getOneHotel,
  updateHotel,
  removeHotel
}