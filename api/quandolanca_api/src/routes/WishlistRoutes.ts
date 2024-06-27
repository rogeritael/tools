import express from "express";
import { WishlistController } from "../controllers/WishlistController";
import { verifyToken } from "../middlewares/verifyToken";

const routes = express.Router()

// routes.get('/:userId', WishlistController.addToWishlist)
routes.get('/', verifyToken, WishlistController.index)
routes.post('/add', verifyToken, WishlistController.store)
routes.delete('/remove', verifyToken, WishlistController.delete)

export { routes as WishlistRoutes }