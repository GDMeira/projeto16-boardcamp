import { Router } from "express";
import { schemaValidation } from "../middlewares/schemaValidation.js";
import { gameSchema } from "../schemas/game.schemas.js";
import { postGame } from "../controllers/game.controllers.js";


const gameRouter = Router();

gameRouter.post('/games', schemaValidation(gameSchema), postGame);

export default gameRouter