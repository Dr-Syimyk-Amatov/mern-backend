import { body } from "express-validator";

export const priorityValidators = [
  body("title").exists(),
  body("colors.primary").exists().isHexColor(),
  body("colors.secondary").exists().isHexColor(),
  body("default").optional(),
];
