import express from "express";
import { loginValidators, registerUserValidators } from "../validators";
import { getMe, login, register } from "../controllers";
import { checkAuth, handleValidatorsErrors } from "../middlewares";

export const authRouter = express.Router();

authRouter.post("/register", registerUserValidators, handleValidatorsErrors, register);
authRouter.post("/login", loginValidators, handleValidatorsErrors, login);
authRouter.get("/me", checkAuth, getMe);
