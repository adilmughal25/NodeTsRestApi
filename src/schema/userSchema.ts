import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export default function UserSchema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (!error) {
    next();
  } else {
    res.status(400).send(error.details[0].message);
  }
}
