const express = require('express')
const router = express.Router()
const userController = require('../controllers/UserController')

router.post('/sign-up', userController.CreateUser)
router.post('/sign-in', userController.LoginUser)

module.exports = router