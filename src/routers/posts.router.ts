import express from "express";

import { checkAuth, handleValidatorsErrors } from "../middlewares";
import { postValidators } from "../validators";
import { createPost, deletePost, getAllPosts, getOnePost, updatePost } from "../controllers";

export const postsRouter = express.Router();

postsRouter.get("/", checkAuth, getAllPosts);
postsRouter.get("/:id", checkAuth, getOnePost);
postsRouter.post("/", checkAuth, postValidators, handleValidatorsErrors, createPost);
postsRouter.patch("/:id", checkAuth, postValidators, handleValidatorsErrors, updatePost);
postsRouter.delete("/:id", checkAuth, deletePost);
