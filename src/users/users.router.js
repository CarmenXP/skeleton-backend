const router = require('express').Router()
const passport = require('passport')
const adminValidate = require('../middlewares/role.middleware')
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
    .patch(passport.authenticate('jwt', {session: false}), userServices.patchUser)
    .delete(
        passport.authenticate('jwt', {session: false}), 
        adminValidate,
        userServices.deleteUser)



    module.exports = router