import Joi from "joi";
import { schemas } from "../../../utils/schema.js";

export const getUserSchema = Joi.object({
  body: {},
  params: {},
  query: {},
});

export const updateUserSchema = Joi.object({
  body: {
    name: Joi.string().min(3).max(200).trim(),
    password: Joi.string()
      .required()
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ),
  },
  params: {},
  query: {},
  file: Joi.object(),
});
export const updateUserByIdSchema = Joi.object({
  body: {
    name: Joi.string().min(3).max(200).trim(),
    password: Joi.string()
      .required()
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ),
  },
  params: {id: schemas.modelId.required()},
  query: {},
  file: Joi.object(),
});

export const deleteUserSchema = Joi.object({
  body: {},
  params: { id: schemas.modelId.required() },
  query: {},
});
