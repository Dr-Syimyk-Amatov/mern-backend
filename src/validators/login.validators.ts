import { body } from "express-validator";

export const loginValidators = [
  body("email", "Incorrect email").isEmail(),
  body("password", "Incorrect password").exists(),
];
