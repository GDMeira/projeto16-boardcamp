import { Router } from "express";
import { rentalSchema } from "../schemas/rent.schemas.js";
import { stringStripHtml } from "../middlewares/stringStripHtmlValidation.js";
import { schemaValidation } from "../middlewares/schemaValidation.js";
import { getRentals, postRental } from "../controllers/rental.controllers.js";

const rentalRouter = Router();

rentalRouter.post('/rentals', stringStripHtml, schemaValidation(rentalSchema), postRental);
rentalRouter.get('/rentals', getRentals);
// rentalRouter.get('/customers/:id', getCustomersById);
// rentalRouter.put('/customers/:id', stringStripHtml, schemaValidation(rentalSchema), updateCustomer);

export default rentalRouter