const express = require('express')
const UserRouter = express.Router()

const UserController = require('../controllers/UserController')

UserRouter.get('/', UserController.index)


module.exports = UserRouter