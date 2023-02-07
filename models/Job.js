const {Schema,model,Types} = require('mongoose')

const jobSchema = Schema({
    company:{
        type:String,
        required:[true,'please enter the company name'],
        maxlength:50
    },
    position:{
        type:String,
        required:[true,'please enter the company position'],
        maxlength:50
    },
    status:{
        type:String,
        enum:['interview','declined','pending'],
        default:'pending'
    },
    createdBy:{
        type:Types.ObjectId,
        ref:'user',
        required:[true,'please enter the user']
    }
},{
    timestamps:true
})


module.exports = model('job',jobSchema)