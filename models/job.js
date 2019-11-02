const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const  jobSchema = new Schema({
    jobName: {
        type: String,
        required: true
    },
    hourlyPay: {
        type: Number,
        default: 0
    },
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    jobNotes: {
        type: String,
        default: ""
    },
    jobLocation: {
        type: String,
        default: ""
    }
})

module.exports = mongoose.model('Job', jobSchema)