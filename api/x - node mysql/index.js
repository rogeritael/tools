const express = require('express')
const UserRoutes = require('./src/routes/UserRoutes')
const sequelize = require('./src/db/sequelize')

const app = express(UserRoutes)
const port = process.env.PORT ? process.env.PORT : 5000

app.use(express.json())
app.use('/users', UserRoutes)


sequelize.authenticate()
.then(() => {
    console.log('banco de dados conectado com sucesso')
}).catch((error) => {
    console.log('erro ao conectar no banco de dados. erro: '+error)
})
app.listen(port ,() => {
    console.log('server is running at http://localhost:'+port)
})