const mongoose = require('mongoose');
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId;

const shiftSchema = new Schema({
    shiftName: {
        type: String,
        default: ""
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
        required: true
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
    shiftNotes: {
        type: String,
        default: ""
    },
    shiftLocation: {
        type: String,
        default: ""
    }
})

shiftSchema.pre('save', function(next){
    const shift = this;
    for (let i = 0; i < shift.employees.length; i++){
        if (shift.employees[i]._id){
            shift.employees[i] = shift.employees[i]._id
        } else if (shift.employees[i].length === 0){
            shift.employees.splice(i, 1);
        }
    }
    if (shift.jobId._id){
        shift.jobId = shift.jobId._id
    }
    if (shift.scheduleId._id){
        shift.scheduleId = shift.scheduleId._id
    }
    next()
})
module.exports = mongoose.model('Shift', shiftSchema)