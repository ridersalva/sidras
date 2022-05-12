const express = require("express")
const router = express.Router()
const User = require("../models/User.model")
const bcrypt = require('bcryptjs')
const jwt = requiere('jsonwebtoken')
const { isAuthenticated } = require('../middlewares/jwt.middleware')
transporter = require('../config/transporter.config')
const saltRounds = 10

///Create User

router.post('/signup', (req, res) => {

    const { email, password, name } = req.body
    if (email === '' || password === '' || name === '') {
        res.status(400).json({ message: "Escribe email, nombre y contraseña" })
    }

    User
        .findOne({ email })
        .then((foundUser) => {
            if (foundUser) {
                res.status(400).json({ message: "Se original, este usuario ya existe" })
                return
            }
            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)
            return User.create({ email, password: hashedPassword, name })
        })
        .then((createUser) => {
            const { email, name, _id } = createUser
            const user = { email, name, _id }
            res.status(201).json({ user })
            //para mandar Mail
            transporter.sendMail({
                from: "imdbprojectteam@gmail.com",
                to: user.email,
                subject: `Welcome to AutoAlert!`,
                text: `${user.name}, welcome to AutoAlert, your personalized reminder service! This is the mail where you are going to receive all the notifications! FUEGOTE!!!`,
                html: "<p>" + `${user.name},  welcome to AutoAlert, your personalized reminder service! This is the mail where you are going to receive all the notifications! FUEGOTE!!!` + "</p>"
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "error de servidor" })
        })

})

///LOGIN USER

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (email === '' || password === '') {
        res.status(400).json({ message: "Introduce email y password" })
        return
    }
    User
        .findOne({ email })
        .then((foundUser) => {
            if (!foundUser) {
                res.status(401).json({ message: "Usuario no encontrado" })
                return;
            }
            if (bcrypt.compareSync(password, foundUser.password)) {
                const { _id, email, name } = foundUser
                const psyload = { _id, email, name }
                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: "6h" }
                )
                res.status(200).jason({ authToken })
            }
            else {
                res.status(401).json({ message: "Imposible la utentificación del usuario" })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Error interno del servidor" })
        })
})
router.get('/verify', isAuthenticated, (req, res) => {
    console.log(req.payload);
    res.status(200).jason(req.payload)
})
module.export = router