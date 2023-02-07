const {model,Schema,Types} = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const userSchema = Schema({
    name:{
        type:String,
        required:[true,'Name Is Required Please Enter it'],
        minlength:2,
        maxlength:20
    },
    email:{
        type:String,
        required:[true,'email Is Required Please Enter it'],
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'Please Enter Valid email'
        ],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Password Is Required Please Enter it'],
        minlength:6
    },
})


userSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})

userSchema.methods.createJWT = function (){
    return jwt.sign({userId:this._id,userName:this.name},process.env.JWT_KEY,{expiresIn:process.env.JWT_LIFETIME})
}

userSchema.methods.comparePassword = async function(userPassword) {
    const match = await bcrypt.compare(userPassword,this.password)
    return match
}
module.exports = model('user',userSchema)