import Joi from 'joi';

export const createShortSchema = Joi.object({
    url: Joi.string().uri().required(),
})