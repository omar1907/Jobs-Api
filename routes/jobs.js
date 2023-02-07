const { getAllJobs, createJob, getJob, updateJob, deleteJob } = require('../controllers/jobs')

const router = require('express').Router()

router.route('/').get(getAllJobs)
router.route('/').post(createJob)
router.route('/:id')
.get(getJob)
.put(updateJob)
.delete(deleteJob)



module.exports = router