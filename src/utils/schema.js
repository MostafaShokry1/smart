import Joi from 'joi'

const modelId = Joi.string().hex().length(24)
const phone=Joi.string().pattern(/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)

export const schemas = {
	modelId,
	phone
}
