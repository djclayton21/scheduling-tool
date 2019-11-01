const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const scheduleSchema = new Schema({
    scheduleStart: {
        type: Date,
        required: true
    },
    scheduleEnd: {
        type: Date,
        required: true
    },
    monday: [{
        type: ObjectId,
        ref: 'Shift'
    }],
    tuesday: [{
        type: ObjectId,
        ref: 'Shift'
    }],
    wednesday: [{
        type: ObjectId,
        ref: 'Shift'
    }],
    thursday: [{
        type: ObjectId,
        ref: 'Shift'
    }],
    friday: [{
        type: ObjectId,
        ref: 'Shift'
    }],
    saturday: [{
        type: ObjectId,
        ref: 'Shift'
    }],
    sunday: [{
        type: ObjectId,
        ref: 'Shift'
    }],
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    scheduleNotes: [String]
})
   
module.exports = mongoose.model('Schedule', scheduleSchema)