import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  endDate: {
    type: Date,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
