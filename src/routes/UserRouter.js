const express = require('express')
const router = express.Router()
const userController = require('../controllers/UserController')

router.post('/sign-up', userController.CreateUser)
router.post('/sign-in', userController.LoginUser)
// router.post('/sign-in-google', userController.LoginUserGoogle)
router.put('/update-user/:id', userController.UpdateUser)
router.delete('/delete-user/:id', userController.DeleteUser)
router.get('/getAll', userController.GetAllUser)
router.get('/get-details/:id', userController.GetDetailsUser)
router.post('/refresh-token', userController.RefreshToken)

module.exports = router