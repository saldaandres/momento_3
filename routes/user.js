const express = require('express')
const cors = require('cors')
const User = require("../models/user");
const router = express.Router()
router.use(cors())

let error = false
let message = ''
let mostrarLista = false

router.get('/', async (req, res) => {
    const users = await User.find()
    res.render('user', {error: error, message: message, mostrarLista: mostrarLista, users: users})
})

router.post('/', async (req, res) => {
    let {userName, name, password, reserveWord, role} = req.body
    if (userName === '' || name === '' || password === '' || reserveWord === '') {
        error = true
        message = 'Rellena todos los campos'
        res.redirect('/user')
        return
    }

    await User.findOne({userName: userName})
    .then((docs) => {
        if (docs != null) {
            error = true
            message = 'Este usuario ya existe'
            res.redirect('/user')
        }
        else {
            if (!role) {
                role = 'user'
            }
            const newUser = new User({
                userName,
                name,
                password,
                reserveWord,
                role
            })
            newUser.save()
            error = false
            message = 'Usuario agregado con exito'
            res.redirect('/user')
        }
    })
        .catch(error => {
            console.log(error)
        })
})


router.post('/login', async (req, res) => {
    let {userName, password} = req.body
    await User.findOne({userName: userName})
        .then((user) => {
            if (!user) {
                error = true
                message = 'No existe este usuario'
                res.redirect('/user')
                return
            }

            if (user.password !== password) {
                error = true
                message = 'Contraseña incorrecta'
                res.redirect('/user')
                return
            }

            error = false
            message = `Bienvenido ${user.name}`
            res.redirect('/user')

        })
})


module.exports = router
