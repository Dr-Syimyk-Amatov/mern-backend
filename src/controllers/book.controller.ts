import { Request, Response } from "express";
import { BookModel } from "../models";

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await BookModel.find()
      .populate({ path: "user", select: "firstName lastName email avatarUrl" })
      .exec();

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get books",
    });
  }
};

export const getOneBook = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (id) {
      const book = await BookModel.findById(id)
        .populate({ path: "user", select: "firstName lastName email avatarUrl" })
        .exec();

      if (book) {
        return res.json(book);
      } else {
        return res.status(404).json({ message: "Book not found" });
      }
    }

    res.status(500).json({
      message: "Failed to get book",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get book",
    });
  }
};

export const createBook = async (req: Request, res: Response) => {
  try {
    const doc = new BookModel({
      name: req.body.name,
      author: req.body.author,
      releaseDate: req.body.releaseDate,
      pagesCount: req.body.pagesCount,
      user: res.locals.userId,
      fileUrl: req.body.fileUrl,
    });

    const book = await doc.save();

    if (book) {
      return res.json(book);
    }

    res.status(500).json({
      message: "Failed to create book",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create book",
    });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (id) {
      const book = await BookModel.findByIdAndUpdate(
        id,
        {
          name: req.body.name,
          author: req.body.author,
          releaseDate: req.body.releaseDate,
          pagesCount: req.body.pagesCount,
          fileUrl: req.body.fileUrl,
        },
        {
          returnDocument: "after",
        }
      );

      if (book) {
        return res.json(book);
      } else {
        return res.status(404).json({
          message: "Book was not found",
        });
      }
    }

    res.status(500).json({
      message: "Failed to update book",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update book",
    });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (id) {
      const book = await BookModel.findByIdAndDelete(id);

      if (book) {
        return res.sendStatus(200);
      } else {
        return res.status(404).json({
          message: "Book was not found",
        });
      }
    }

    res.status(500).json({
      message: "Failed to delete book",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete book",
    });
  }
};
