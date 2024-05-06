import mongoose from "mongoose";
import { createToJSON, createToObject } from "../utils";

export interface Book {
  name: string;
  user: mongoose.Schema.Types.ObjectId;
  fileUrl?: string;
  author?: string;
  pagesCount?: string;
  releaseDate?: string;
  publishYear?: number;
}

const bookSchema = new mongoose.Schema<Book>(
  {
    name: {
      type: String,
      required: true,
    },
    author: {
      type: String,
    },
    pagesCount: {
      type: Number,
    },
    releaseDate: {
      type: Date,
    },
    publishYear: {
      type: Number,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    fileUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: createToJSON(),
    toObject: createToObject(),
  }
);

export const BookModel = mongoose.model("Book", bookSchema);
