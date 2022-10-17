//middleware para protejer rutas
{/*
-revisar si existe un token
-verificar si el token pertenece a un usuario válido
-modificar el req  y agregar req.user con la información  desencriptada del tokendel
ESTRATEGIAS
hace referencia  a las diferentes maneras de hacer un login ejemplo: google, facebook, JWT, etc.
*/}

const JwtStrategy = require('passport-jwt').Strategy //Passport maneja estrategias para las diferentes autenticaciones
const ExtractJwt = require('passport-jwt').ExtractJwt // Extrae los headers de la petición (req)
const {jwtSecret} = require('../config')
const { getUserById } = require('../users/users.controllers')

//Exportando mediante una función anónima
module.exports = (passport) => {
    const options = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
        secretOrKey:  jwtSecret
    }

    passport.use(
        new JwtStrategy(options,  async(decoded, done)=>{
            // done(err, decoded)
            try {
                const response = await getUserById(decoded.id)
                if(!response){
                    return done(null, false)
                }
                console.log('decode JWT', decoded)
                return done(null, decoded)
            } catch (error) {
                return done(error, false)
            }
        })
    )
}
