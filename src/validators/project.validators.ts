import { body } from "express-validator";
import { isValidObjectId } from "mongoose";

export const projectValidators = [
  body("title").isString().trim().notEmpty(),
  body("order").isInt({ min: 0 }),
  body("users").isArray(),
  body("users.*")
    .custom((value) => isValidObjectId(value))
    .withMessage("Invalid ObjectId"),
  body("statuses").isArray(),
  body("statuses.*.title").isString().trim().notEmpty(),
  body("statuses.*.order").isInt({ min: 0 }),
];
