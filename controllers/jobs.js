const jobModel = require('../models/Job')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError,NotFoundError} = require('../errors')

exports.getAllJobs = async (req, res) =>{
    const Jobs = await jobModel.find({createdBy:req.user.userId})
    res.status(StatusCodes.OK).json({Jobs,Count:Jobs.length})
}

exports.getJob = async (req, res) =>{
    const {user:{userId}, params:{id:jobId},} = req

    const Job = await jobModel.findOne({
        _id:jobId,
        createdBy:userId
    })
    if(!Job){
        throw new NotFoundError(`NoJob with Id ${req.params.id}`)
    }

    res.status(StatusCodes.OK).json({Job})
    
}

exports.createJob = async (req, res) =>{
    req.body.createdBy = req.user.userId
    const Job = await jobModel.create(req.body)
    res.status(StatusCodes.CREATED).json({Job})
}

exports.updateJob = async (req, res) =>{
    const {user:{userId}, params:{id:jobId},body:{company,postiton}} = req

    if(company === '' || postiton === ''){
        throw new BadRequestError('Please Enter The Update Parameters')
    }

    const Job = await jobModel.findByIdAndUpdate({_id:jobId,
        createdBy:userId},req.body,{new:true,runValidators:true})
        if(!Job){
            throw new NotFoundError(`NoJob with Id ${req.params.id}`)
        }
        res.status(StatusCodes.OK).json({Job})
}

exports.deleteJob = async (req, res) =>{
    const {user:{userId}, params:{id:jobId},} = req
    const Job = await jobModel.findByIdAndDelete({_id:jobId,
        createdBy:userId})
    if(!Job){
        throw new NotFoundError(`NoJob with Id ${req.params.id}`)
    }
    res.status(StatusCodes.OK).json({msg:'Deleted'})
    
} 