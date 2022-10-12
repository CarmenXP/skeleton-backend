const bcrypt = require('bcrypt')
const { Utils } = require('sequelize')

//encriptando contraseña
const hashPassword = (plainPassword) => {
    return bcrypt.hashSync(plainPassword, 10)
}

const comparePassword = (plainPassword, hashedPassword) =>{
    return bcrypt.compareSync(plainPassword, hashedPassword)
}

//console.log(hashPassword('root'))
//console.log(comparePassword('root', '$2b$10$EoU4/s0sNVd96pwQ5w5xEu.TJV1x2kmUyUkZUUkWUSdz8Djcw.TWi'))

module.exports = {
    hashPassword,
    comparePassword
}