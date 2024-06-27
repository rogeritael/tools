import express from 'express';
import { ScrapperRoutes } from './routes/ScrapperRoutes';
import { GamesRoutes } from './routes/GamesRoutes';
import { UserRoutes } from './routes/UserRoutes';
import { WishlistRoutes } from './routes/WishlistRoutes';

const app = express()


app.use(express.json()) //para habilitar o envio de informações em json
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*') //dominio autorizado
    res.setHeader('Access-Control-Allow-Methods', '*') //get, post, delete
    res.setHeader('Access-Control-Allow-Headers', '*')
    next()
})
    
app.use('/games', ScrapperRoutes)
app.use('/games', GamesRoutes)
app.use('/users', UserRoutes)
app.use('/wishlist', WishlistRoutes)


app.listen(process.env.PORT? Number(process.env.PORT) : 5000, () => {
    console.log(`🚀 server is running at http://localhost:${process.env.PORT? process.env.PORT: 5000}`)
})