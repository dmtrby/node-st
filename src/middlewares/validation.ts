import { NextFunction, Request, Response } from "express";
import Joi from "joi";

import { PASSWORD_REGEXP } from "../constants";

export function validateUser(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const schema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string()
      .pattern(PASSWORD_REGEXP, "letters and numbers are required")
      .required(),
    age: Joi.number().greater(4).less(130).required(),
    isDeleted: Joi.boolean().required(),
  });
  validateRequest(req, next, schema);
}

// helper functions

function validateRequest(
  req: Request,
  next: NextFunction,
  schema: Joi.ObjectSchema<unknown>
): void {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    next(`Validation error: ${error.details.map((x) => x.message).join(", ")}`);
  } else {
    req.body = value;
    next();
  }
}
