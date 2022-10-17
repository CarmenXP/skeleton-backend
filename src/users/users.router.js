const router = require('express').Router()
const passport = require('passport')

const userServices = require('./users.services')

require('../middlewares/auth.middleware')(passport)


router.get('/', 
passport.authenticate('jwt', {session: false}), 
userServices.allUsers)

//ruta de información del propio usuario logeado
router.route('/me')
    .get(
        passport.authenticate('jwt', {session: false}),
        userServices.getMyUser)

//*************HOMEWORK************** */

//.patch
router.route('/me')
        .patch(passport.authenticate('jwt', {session: false}), 
        userServices.updateMyUser
        )

//.delete
router.route('/me')
        .delete(passport.authenticate('jwt', {session: false}),
        userServices.deleteMyUser
        )

//************************************************/
//api/v1/users/:id
router.route('/:id')
    .get(userServices.userById)
    .patch(userServices.patchUser)
    .delete(userServices.deleteUser)



    module.exports = router