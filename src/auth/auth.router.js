//va a contener las rutas de autorización y autenticación
//Login
//Register
//recovery y password
//verificar usuario

const router = require('express').Router()
const authServices = require('./auth.services')
const {registerUser} = require('../users/users.services') 


router.post('/register', registerUser)

router.post('/login', authServices.login)

module.exports = router