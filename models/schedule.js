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

scheduleSchema.pre('save', function(next){
    const schedule = this;
    
    for (let i = 0; i < schedule.monday.length; i++){
        if (schedule.monday[i]._id){
            schedule.monday[i] = schedule.monday[i]._id
        }
    }
    for (let i = 0; i < schedule.tuesday.length; i++){
        if (schedule.tuesday[i]._id){
            schedule.tuesday[i] = schedule.tuesday[i]._id
        }
    }
    for (let i = 0; i < schedule.wednesday.length; i++){
        if (schedule.wednesday[i]._id){
            schedule.wednesday[i] = schedule.wednesday[i]._id
        }
    }
    for (let i = 0; i < schedule.thursday.length; i++){
        if (schedule.thursday[i]._id){
            schedule.thursday[i] = schedule.thursday[i]._id
        }
    }
    for (let i = 0; i < schedule.friday.length; i++){
        if (schedule.friday[i]._id){
            schedule.friday[i] = schedule.friday[i]._id
        }
    }
    for (let i = 0; i < schedule.saturday.length; i++){
        if (schedule.saturday[i]._id){
            schedule.saturday[i] = schedule.saturday[i]._id
        }
    }
    for (let i = 0; i < schedule.sunday.length; i++){
        if (schedule.sunday[i]._id){
            schedule.sunday[i] = schedule.sunday[i]._id
        }
    }
    next()
})
module.exports = mongoose.model('Schedule', scheduleSchema)