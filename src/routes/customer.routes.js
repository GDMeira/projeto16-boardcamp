import { Router } from "express";
import { getCustomers, getCustomersById, postCustomer } from "../controllers/customer.controllers.js";
import { schemaValidation } from "../middlewares/schemaValidation.js";
import { stringStripHtml } from "../middlewares/stringStripHtmlValidation.js";
import { clientSchema } from "../schemas/customer.schemas.js";

const customerRouter = Router();

customerRouter.post('/customers', stringStripHtml, schemaValidation(clientSchema), postCustomer);
customerRouter.get('/customers', getCustomers);
customerRouter.get('/customers/:id', getCustomersById);

export default customerRouter