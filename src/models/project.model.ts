import mongoose from "mongoose";
import { createToJSON } from "../utils";

const statusSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
  },
  {
    toJSON: createToJSON(),
  }
);

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
    users: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
      },
    ],
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    statuses: [statusSchema],
  },
  {
    toJSON: createToJSON(),
  }
);

export const ProjectModel = mongoose.model("Project", projectSchema);
