const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const employeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    jobs: [{
        type: ObjectId,
        ref: 'Job'
    }],
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    scheduleBlocks: [{
        day: {
            type: String,
            enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
            required: true
        },
        startTime: {
            type: String,
        },
        endTime: {
            type: String
        },
        isAllDay: {
            type: Boolean,
            default: false
        },
        blockNotes: String
    }],
    offRequests:[{
        reqStart: {
            type: Date,
            required: true
        },
        reqEnd: {
            type: Date, 
            required: true
        },
        reqNotes: String
    }],
    employeeNotes: String    
})

module.exports = mongoose.model('Employee', employeeSchema)