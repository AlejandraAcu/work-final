const bcrypt = require ("bcrypt")
const { loginServices } = require("../services/user.services")

async function loginMiddlewares(req, res, next){
    const {email, password} = req.body

    const user = await loginServices(email);
    if (!user) return res.status(401).json({message: 'Credentials invalid'})
        
    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) return res.status(401).json({message: 'Credentials invalid'})
    
    if (user.isVerified === 'false') return res.status(401).json({message: 'isVerified:false'})
        
    req.userlogged = user 
    
    next()
}

module.exports = loginMiddlewares