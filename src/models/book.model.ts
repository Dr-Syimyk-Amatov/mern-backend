import mongoose from "mongoose";
import { createToJSON } from "../utils";

const bookSchema = new mongoose.Schema(
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
  }
);

export const BookModel = mongoose.model("Book", bookSchema);
