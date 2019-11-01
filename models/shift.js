const mongoose = require('mongoose');
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId;

const shiftSchema = new Schema({
    shiftName: {
        type: String,
        required: true
    },
    shiftStart: {
        type: Date,
        required: true
    },
    shiftEnd: {
        type: Date,
        required: true
    },
    jobId: {
        type: ObjectId,
        ref: 'Job',
        required: true
    },
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    scheduleId: {
        type: ObjectId,
        ref: 'Schedule',
    },
    employees: [{
        type: ObjectId,
        ref: 'Employee'
    }],
    minEmployees: {
        type: Number,
        default: 1
    },
    maxEmployees: {
        type: Number,
        default: 1
    },
    shiftNotes: [""]
})

module.exports = mongoose.model('Shift', shiftSchema)