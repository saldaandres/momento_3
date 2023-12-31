const mongoose = require('mongoose')
const Schema = mongoose.Schema

const returnSchema = Schema({
    rentNumber: Number,
    returnDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Return', returnSchema)
