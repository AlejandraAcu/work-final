const { image } = require('../models');

const getAllImage = async () => {
  return await image.findAll();
}

const createImage = async (body) => {
  return await image.create(body);
}

const getOneImage = async (id) => {
  return await image.findByPk(id);
}

const updateImage = async (body, id) => {
  return await image.update(
    body,
    { where: { id }, returning: true }
  );
}

const removeImage = async (id) => {
  return await image.destroy({ where: { id } });
}


module.exports = {
  getAllImage,
  createImage,
  getOneImage,
  updateImage,
  removeImage,
}
