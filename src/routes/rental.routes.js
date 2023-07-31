import { Router } from "express";
import { rentalSchema } from "../schemas/rent.schemas.js";
import { stringStripHtml } from "../middlewares/stringStripHtmlValidation.js";
import { schemaValidation } from "../middlewares/schemaValidation.js";
import { deleteRental, getRentals, postRental, returnRental } from "../controllers/rental.controllers.js";

const rentalRouter = Router();

rentalRouter.post('/rentals', stringStripHtml, schemaValidation(rentalSchema), postRental);
rentalRouter.get('/rentals', getRentals);
rentalRouter.post('/rentals/:id/return', returnRental);
rentalRouter.delete('/rentals/:id', deleteRental);

export default rentalRouter