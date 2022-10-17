const { getUserByEmail } = require("../users/users.controllers")
const {comparePassword} = require('../utils/crypto')

const loginUser = async (email, password) => {
    try{
        const user= await getUserByEmail(email)
        const verifyPassword = comparePassword(password, user.password)
        if(verifyPassword){
            return user
        }
        return false
        
    }catch {
        return false
    }
}
//logeando
loginUser('carmen@example.com', 'string123')
    .then((res => console.log(res)))
    .catch((err) => console.log(err))

module.exports = { loginUser}