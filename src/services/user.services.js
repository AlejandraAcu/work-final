const {user} = require('../models')

const getAllServices = async() => {
     return await user.findAll()
} 

const createServices = async(body) => {
    return  await user.create(body)
} 

const getOneServices = async(id) => {
    return await user.findByPk(id)
} 

const removeServices = async(id) => {
    return await user.destroy({ where: {id} })
} 

const updateServices = async(body, id) => {
    return await user.update(
        body,
        { where: {id}, returning: true }
    );
} 

const loginServices = async(email) =>{
    return await user.findOne({ where: {email}})
}

module.exports = {
    getAllServices,
    createServices,
    getOneServices,
    removeServices,
    updateServices,
    loginServices
  
}