import express from "express";
import { ScrapperController } from "../controllers/ScrapperController";
import { UserController } from "../controllers/UserController";

const routes = express.Router()

routes.post('/register', UserController.store)
routes.post('/login', UserController.login)
// routes.post('/login', ScrapperController.insertGames)
// routes.post('/delete_account', ScrapperController.insertGames)

export { routes as UserRoutes }