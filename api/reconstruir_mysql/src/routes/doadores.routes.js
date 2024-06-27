// const express = require('express')
const express = require('express')
const router = express.Router()

const DoadoresController = require('../controllers/doadores.controller')


router.get('/', DoadoresController.store)

module.exports = router