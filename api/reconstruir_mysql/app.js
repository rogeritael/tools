//imports
const express = require('express')
const rotasDoadores = require('./src/routes/doadores.routes')
const { sequelize } = require('./src/models')

//configs
const app = express()
app.use(express.json())

//routes
app.use('/doadores', rotasDoadores)

//rodando o servidor
sequelize.sync().then(() => {
    console.log('banco de dados conectado com sucesso')
})

app.listen(3000, () => {
    console.log('Server running...')
})