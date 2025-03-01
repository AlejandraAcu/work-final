const catchError = require('../utils/catchError');
const { createServices, getOneServices, removeServices, updateServices, getAllServices } = require('../services/user.services');

const getAll = catchError(async(req, res) => {
    const results = await getAllServices();
    return res.json(results);
});

const create = catchError(async (req, res) => {
    const result = await createServices({...req.body,password: req.hashPassword,});
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await getOneServices(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await removeServices(id);
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await updateServices(req.body , id);
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const login = catchError(async(req, res) => {
    const user = req.userlogged;
    const token = req.token;
    return res.json({user, token});
})

const logged = catchError(async(req,res) =>{
    const user = req.user;
    return res.json(user);
})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    login,
    logged,
}