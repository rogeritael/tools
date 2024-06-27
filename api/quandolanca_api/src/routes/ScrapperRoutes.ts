import express from "express";
import { ScrapperController } from "../controllers/ScrapperController";

const routes = express.Router()

routes.post('/save_announced_games', ScrapperController.findAnnouncedGames)
routes.post('/insert_games', ScrapperController.insertGames)

export { routes as ScrapperRoutes }