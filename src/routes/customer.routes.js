import { Router } from "express";
import { getCustomers, getCustomersById, postCustomer, updateCustomer } from "../controllers/customer.controllers.js";
import { schemaValidation } from "../middlewares/schemaValidation.js";
import { stringStripHtml } from "../middlewares/stringStripHtmlValidation.js";
import { customerSchema } from "../schemas/customer.schemas.js";

const customerRouter = Router();

customerRouter.post('/customers', stringStripHtml, schemaValidation(customerSchema), postCustomer);
customerRouter.get('/customers', getCustomers);
customerRouter.get('/customers/:id', getCustomersById);
customerRouter.put('/customers/:id', stringStripHtml, schemaValidation(customerSchema), updateCustomer);

export default customerRouter