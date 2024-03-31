import { body } from "express-validator";

export const projectValidators = [
  body("title").isString().trim().notEmpty(),
  body("order").isInt({ min: 0 }),
  body("userIds").isArray(),
  body("userIds.*").isString().trim().notEmpty(),
  body("statuses").isArray(),
  body("statuses.*.title").isString().trim().notEmpty(),
  body("statuses.*.order").isInt({ min: 0 }),
];
