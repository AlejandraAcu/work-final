const catchError = require('../utils/catchError');
const { getAllBookings, createBookings, getOneBookings, updateBookings, removeBookings } = require('../services/booking.services');

const getAll = catchError(async (req, res) => {
  const results = await getAllBookings();
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const result = await createBookings(req.body);
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await getOneBookings(id);
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await removeBookings(id);
  if (!result) return res.sendStatus(404);
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await updateBookings(req.body, id);
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update
}