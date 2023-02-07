const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')

const auth = async (req, res, next) =>{

    const authHeader = req.headers.token
    if(!authHeader){
        throw new UnauthenticatedError('Authentication Invalid')
    }

    try {
        const token = jwt.verify(authHeader,process.env.JWT_KEY)
        req.user = token
        next()
    } catch (error) {
        throw new UnauthenticatedError('Authentication Invalid1') 
    }

    

}

module.exports = auth