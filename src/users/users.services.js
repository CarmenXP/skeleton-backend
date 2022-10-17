const { response } = require('express')
const userControllers = require('./users.controllers')

const allUsers = (req, res) =>{
    userControllers.getAllUsers()
        .then((data) =>{
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}

const userById = (req, res) => {
    const id = req.params.id
    userControllers.getUserById(id)
        .then((data) =>{
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })

}

const patchUser  = (req, res) => {
    const id = req.params.id
    const {firstName, lastName, phone, gender, country } = req.body

    userControllers.updateUser(id, {firstName, lastName, phone, gender, country})
        .then( data => {
            if(data[0]){
                res.status(200).json({message: `Usuario con ${id} modificado exitosamente`})
            }else{
                res.status(400).json({message: 'ID invalido'})
            }
        })
        .catch(err => {
            res.status(404).json({message: err.message})
        })
}

const deleteUser = (req, res) =>{
    const id = req.params.id
    userControllers.deleteUser(id)
    .then(data => {
        if(data){
            res.status(204).json()
        }else{
            res.status(404).json({message: 'ID invalido'})
        }
    })
    .catch(err => {
        res.status(404).json({message: err.message})
    })
}

const registerUser = (req, res) => {
    const {firstName, lastName, email, password, phone, birthday, gender, country } = req.body;
    
    if (
    firstName &&
    lastName &&
    email &&
    password &&
    phone &&
    birthday
    ) {
    //? Ejecutamos el controller
    userControllers.createUser({
    firstName, lastName, email, password, phone, birthday, gender, country
    })
    .then( data => {
    res.status(201).json(data)
    })
    .catch(err => {
    res.status(400).json(err.message)
    })
    } else {
    //? Error cuando no mandan todos los datos necesarios para crear un usuario
    res.status(400).json({message: 'All fields must be completed', fields: {
    firstName: 'string',
    lastName: 'string',
    email: 'example@example.com',
    password: 'string',
    phone: '+521231231231',
    birthday: 'YYYY/MM/DD'
    }})
    } 
}

//my user services

const getMyUser = (req, res) => {
    const id = req.user.id // req.user continen la información del token desencriptado
    userControllers.getUserById(id)
        .then( data =>{
                res.status(200).json(data)
        })
        .catch (err => {
            res.status(400).json({message: err.message})
        })
}
//**********HOMEWORK*************/
//services to update and delete
const updateMyUser = (req, res) => {
    const id = req.user.id
    const {firstName, lastName, phone, birthday, email, password} = req.body
    userControllers.updateUser(id, {firstName, lastName, phone, birthday, email, password})
        .then(() => {
                res.status(200).json({ message: "Your user was modified"})
           
        })
        .catch( err => {
            res.status(400).json({message: err.message})
        })

}

const deleteMyUser = (req, res) => {
    const id = req.user.id
    userControllers.deleteUser(id)
        .then( () =>{
            res.status(204).json({message: "Your user was deleted"})
        })
        .catch(res.status(400).json({message: err.message}))
    
}

module.exports = {
    allUsers,
    userById,
    patchUser,
    registerUser,
    deleteUser,
    getMyUser,
    deleteMyUser,
    updateMyUser

    } 