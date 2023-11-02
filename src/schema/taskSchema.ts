import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export default function TaskSchema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const schema = Joi.object({
    name: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (!error) {
    next();
  } else {
    res.status(400).send(error.details[0].message);
  }
}
