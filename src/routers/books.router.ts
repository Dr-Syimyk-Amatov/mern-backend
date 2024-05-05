import { Router } from "express";
import { bookValidators } from "../validators";
import { checkAuth, handleValidatorsErrors } from "../middlewares";
import { createBook, deleteBook, getAllBooks, getOneBook, updateBook } from "../controllers";

export const booksRouter = Router();

booksRouter.get("/", checkAuth, getAllBooks);
booksRouter.get("/:id", checkAuth, getOneBook);
booksRouter.post("/", checkAuth, bookValidators, handleValidatorsErrors, createBook);
booksRouter.put("/:id", checkAuth, bookValidators, handleValidatorsErrors, updateBook);
booksRouter.delete("/:id", checkAuth, deleteBook);
