const mongoose = require('mongoose')
const {Schema} = mongoose;

const rentSchema = new Schema({
    rentNumber: Number,
    userName: String,
    plate: String,
    rentDate: {
        type: Date,
        default: Date.now
    },
    finalDate: Date,
    currentStatus: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Rent', rentSchema)
