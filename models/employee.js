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
    scheduleBlocks: {
        type: [{
            blockStart: {
                type: Date,
                required: true
            },
            blockEnd: {
                type: Date,
                required: true
            }
        }],
    },
    offRequests: {
        type: [{
            reqStart: {
                type: Date,
                required: true
            },
            reqEnd: {
                type: Date, 
                required: true
            }
        }]    
    }
})

module.exports = mongoose.model('Employee', employeeSchema)