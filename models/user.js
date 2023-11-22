const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = Schema({
    userName: String,
    name: String,
    password: String,
    role: {
        type: String,
        default: 'user'
    },
    reserveWord: String
})

module.exports = mongoose.model('User', userSchema)
