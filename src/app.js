//Dependencias

const express = require('express');

//Archivos

const {PORT} = require('./config')

// Configuraciones iniciales

const app = express()

app.use(express.json())

app.get('/', (req, res) =>{
    res.status(200).json({
        message: 'OK',
        users: `localhost: ${PORT}/api/v1/users`
    })
})





app.listen(9000, () =>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})