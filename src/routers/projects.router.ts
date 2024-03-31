import express from "express";
import { checkAuth, handleValidatorsErrors } from "../middlewares";
import { projectValidators } from "../validators";
import { createProject, deleteProject, getAllProjects, getOneProject, updateProject } from "../controllers";

export const projectRouter = express.Router();

projectRouter.get("/", checkAuth, getAllProjects);
projectRouter.get("/:id", checkAuth, getOneProject);
projectRouter.post("/", checkAuth, projectValidators, handleValidatorsErrors, createProject);
projectRouter.put("/:id", checkAuth, projectValidators, handleValidatorsErrors, updateProject);
projectRouter.delete("/:id", checkAuth, deleteProject);
