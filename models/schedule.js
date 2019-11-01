const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const scheduleSchema = new Schema({
    scheduleStart: {
        type: Date,
        required: true
    },
    days: [

    ]
})
   
module.exports = mongoose.model('Schedule', scheduleSchema)