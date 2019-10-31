const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const  jobSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    hourly: {
        type: Number,
        default: 0
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    }
})
module.exports = mongoose.model('Job', jobSchema)