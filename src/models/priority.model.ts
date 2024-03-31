import mongoose from "mongoose";
import { createToJSON } from "../utils";

const prioritySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    colors: {
      primary: {
        type: String,
        required: true,
      },
      secondary: {
        type: String,
        required: true,
      },
    },
    default: {
      type: Boolean,
    },
  },
  {
    toJSON: createToJSON(),
  }
);

export const PriorityModel = mongoose.model("Priority", prioritySchema);
