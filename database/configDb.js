const  mongoose = require("mongoose");

function connectToDB() {
    mongoose.connect('mongodb+srv://andres:iYHdJuhRUNJPuWny@cluster0.konpbyg.mongodb.net/?retryWrites=true&w=majority').then(db => console.log('Base de datos conectada')).catch(err => console.log(err))
}

module.exports = connectToDB
