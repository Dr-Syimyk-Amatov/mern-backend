import { body } from "express-validator";

export const postValidators = [
  body("title").isLength({ min: 3 }),
  body("content").exists(),
  body("tags").isArray(),
  body("imageUrl").optional().isURL(),
];
