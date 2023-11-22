const express = require('express')
const cors = require('cors')
const Return = require('../models/return')
const Rent = require('../models/rent')
const User = require('../models/user')
const Car = require('../models/car')
const router = express.Router()
router.use(cors())

let error = false
let message = ''
let mostrarLista = false
let rent

router.get('/', async (req, res) => {
    res.render('returnCar', {error, message, rent})
})

router.post('/consultar', async (req, res) => {
    let {rentNumber} = req.body
    rent = await Rent.findOne({rentNumber: Number(rentNumber)})

    if (rent) {
        error = false
        message = 'Carro encontrado'
        res.redirect('/returnCar')
    }
    else {
        error = true
        message ='Carro no encontrado'
        res.redirect('/returnCar')

    }
})

router.get('/devolver/:rentNumber', async (req, res) => {
    let {rentNumber} = req.params
    rent = await Rent.findOne({rentNumber: Number(rentNumber)})

    if (rent.currentStatus === false) {
        error = true
        message = 'Renta ya fue cerrada'
        res.redirect('/returnCar')
        return
    }

    rent.currentStatus = false
    await rent.save()

    let newReturn = new Return({rentNumber: rentNumber})
    await newReturn.save()

    let carro = await Car.findOne({plate: rent.plate})
    carro.available = true
    await carro.save()



    error = false
    message = 'Carro devuelto'
    res.redirect('/returnCar')

})

module.exports = router
