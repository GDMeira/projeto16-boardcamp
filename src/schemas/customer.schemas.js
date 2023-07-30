import Joi from "joi";

export const customerSchema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().min(10).max(11).pattern(/^[0-9]+$/).required(),
    cpf: Joi.string().pattern(/^[0-9]{11}/).required(),
    birthday: Joi.string().isoDate()
})