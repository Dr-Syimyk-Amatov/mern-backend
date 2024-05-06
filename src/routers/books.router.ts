import { Router } from "express";

import { bookValidators } from "../validators";
import { checkAuth, checkPaginationParams, checkSortParams, handleValidatorsErrors } from "../middlewares";
import { createBook, deleteBook, getAllBooks, getOneBook, updateBook } from "../controllers";

export const booksRouter = Router();

booksRouter.get(
  "/",
  checkAuth,
  checkSortParams(["name", "author", "releaseDate", "publishYear", "pagesCount"]),
  checkPaginationParams,
  getAllBooks
);
booksRouter.get("/:id", checkAuth, getOneBook);
booksRouter.post("/", checkAuth, bookValidators, handleValidatorsErrors, createBook);
booksRouter.put("/:id", checkAuth, bookValidators, handleValidatorsErrors, updateBook);
booksRouter.delete("/:id", checkAuth, deleteBook);
