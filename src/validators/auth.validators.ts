import { body } from "express-validator";

export const registerUserValidators = [
  body("email", "Incorrect email").isEmail(),
  body("password", "Incorrect password. Password should contain at least 5 characters").isLength({ min: 5 }),
  body("firstName", "Incorrect name").isLength({ min: 3 }),
  body("lastName", "Incorrect name").isLength({ min: 3 }),
  body("avatarUrl", "Incorrect link to avatar").optional().isURL(),
];
