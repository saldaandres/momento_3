const express = require('express')
const Car = require('../models/car')
const router = express.Router()

let error = false
let message = ''
let mostrarLista = false

router.get('/', async (req, res) => {
    const cars = await Car.find()
    res.render('car', {error: error, message: message, mostrarLista: mostrarLista, cars: cars})
})


router.post('/', async (req, res) => {
    let {brand, plate, dailyValue} = req.body
    if (brand === '' || plate === ''){
        error = true
        message = 'Rellena la placa y la marca del carro'
        res.redirect('/car')
        return
    }

    await Car.findOne({plate: plate})
        .then((docs) => {
            if (docs) {
                error = true
                message = 'Este auto ya existe en la BD'
                res.redirect('/car')
            }
            else {
                const newCar = new Car({plate, brand, dailyValue})
                newCar.save()
                error = false
                message = 'Carro agregado con exito'
                res.redirect('/car')
            }
        })
        .catch(error => {
            console.log(error)
        })
})

router.get('/listar', async (req, res) => {
    mostrarLista = !mostrarLista
    res.redirect('/car')
})

module.exports = router
