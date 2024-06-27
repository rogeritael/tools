const Sequelize = require('sequelize')
const sequelize = require('../config/sequelize')

const Doadores = require('./doadores.model')

const doador = Doadores(sequelize, Sequelize.DataTypes)

const db = {
    doador,
    sequelize
}

module.exports = db