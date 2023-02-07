const userModel = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const {BadRequestError,UnauthenticatedError} = require('../errors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) =>{

    const User = await userModel.create({...req.body})
    const token = User.createJWT()
    res.status(StatusCodes.CREATED).json({msg:"Created successfully",user:{name:User.name},token})
}

exports.login = async (req, res) =>{
    const {email,password} = req.body

    if(!email || !password) {
        throw new BadRequestError('Please Enter email and Password')
    }
    const User = await userModel.findOne({email})
    if(!User) {
        throw new UnauthenticatedError('Invalid Email')
    }
    const isPass = await User.comparePassword(password)
    if(!isPass){
        throw new UnauthenticatedError('Invalid Password');
    }
        const token = User.createJWT()
        res.status(StatusCodes.OK).json({user:{userName:User.name},token})

}