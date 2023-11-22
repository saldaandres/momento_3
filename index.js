const express = require('express')
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 3200
const index = express()
const morgan = require('morgan')
const connectToDB = require("./database/configDb");

// enrutadores
const user = require('./routes/user')
const car = require('./routes/car')
const rent = require('./routes/rent')
const returnCar = require('./routes/returnCar')

// conectar a la base de datos
connectToDB()

index.set('view engine', 'pug')
index.set('views', 'views')
index.locals.moment = require('moment')

index.use(express.urlencoded({extended:true}))
index.use(express.json())
index.use(express.static('public'))
index.use(morgan('dev'))
index.use(cors())

index.use('/user', user)
index.use('/car', car)
index.use('/rent', rent)
index.use('/returnCar', returnCar)

index.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`)
})

index.get('/', (req, res) => {
    res.send('Inicio de la APP')
})


