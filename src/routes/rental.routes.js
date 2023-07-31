import { Router } from "express";
import { rentalSchema } from "../schemas/rent.schemas.js";
import { stringStripHtml } from "../middlewares/stringStripHtmlValidation.js";
import { schemaValidation } from "../middlewares/schemaValidation.js";
import { getRentals, postRental, returnRental } from "../controllers/rental.controllers.js";

const rentalRouter = Router();

rentalRouter.post('/rentals', stringStripHtml, schemaValidation(rentalSchema), postRental);
rentalRouter.get('/rentals', getRentals);
rentalRouter.get('/rentals/:id/return', returnRental);
// rentalRouter.put('/customers/:id', stringStripHtml, schemaValidation(rentalSchema), updateCustomer);

export default rentalRouter