import Joi from "joi";
import { schemas } from "../../../utils/schema.js";

export const getChildSchema = Joi.object({
  body: {},
  params: {},
  query: {},
});

export const addChildSchema = Joi.object({
  body: {
    name: Joi.string().min(3).max(200).trim(),
    grade: Joi.string().trim(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    password: Joi.string()
      .required()
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ),
    address: Joi.string(),
    phone_Number: schemas.phone.required(),
    gender: Joi.string().valid("MALE", "FEMALE"),
    parent_id: schemas.modelId.required(),
  },
  params: {},
  query: {},
  file: Joi.object().required(),
});

export const updateChildSchema = Joi.object({
  body: {
    name: Joi.string().min(3).max(200).trim(),
    grade: Joi.string().trim(),
    password: Joi.string()
      .required()
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ),
    address: Joi.string(),
    phone_Number: schemas.phone.required(),
    gender: Joi.string().valid("MALE", "FEMALE"),
    parent_id: schemas.modelId.required(),
  },
  params: { id: schemas.modelId.required() },
  query: {},
  file: Joi.object(),
});

export const deleteChildSchema = Joi.object({
  body: {},
  params: { id: schemas.modelId.required() },
  query: {},
});
