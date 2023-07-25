import { Router } from "express";
import { schemaValidation } from "../middlewares/schemaValidation.js";
import { gameSchema } from "../schemas/game.schemas.js";
import { getGames, postGame } from "../controllers/game.controllers.js";


const gameRouter = Router();

gameRouter.post('/games', schemaValidation(gameSchema), postGame);
gameRouter.get('/games', getGames);

export default gameRouter