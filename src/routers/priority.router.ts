import express from "express";

import { checkAuth, handleValidatorsErrors } from "../middlewares";
import { priorityValidators } from "../validators";
import { createPriority, deletePriority, getAllPriorities, getOnePriority, updatePriority } from "../controllers";
import { checkSortParams } from "../middlewares/sort-params";

export const priorityRouter = express.Router();

priorityRouter.get("/", checkAuth, checkSortParams(["title", "colors.primary", "colors.secondary"]), getAllPriorities);
priorityRouter.get("/:id", checkAuth, getOnePriority);
priorityRouter.post("/", checkAuth, priorityValidators, handleValidatorsErrors, createPriority);
priorityRouter.put("/:id", checkAuth, priorityValidators, handleValidatorsErrors, updatePriority);
priorityRouter.delete("/:id", checkAuth, deletePriority);
