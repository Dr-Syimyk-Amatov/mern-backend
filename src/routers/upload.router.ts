import express from "express";
import multer from "multer";
import { uploadFile } from "../controllers";
import { checkAuth } from "../middlewares";

const storage = multer.diskStorage({
  destination: "dist/uploads",
  filename(req, file, callback) {
    callback(null, file.originalname);
  },
});

const uploads = multer({ storage });

export const uploadRouter = express.Router();

uploadRouter.post("/", checkAuth, uploads.single("image"), uploadFile);
