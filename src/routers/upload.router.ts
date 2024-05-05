import express, { NextFunction, Request, Response } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import { uploadFile } from "../controllers";
import { checkAuth } from "../middlewares";

const storage = multer.diskStorage({
  destination: "dist/uploads",
  filename(req: Request, file: Express.Multer.File, callback) {
    callback(null, file.originalname);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  // Validate file extension
  const allowedExtensions = [".pdf", ".doc", ".png", ".docx", ".jpg", ".svg"];
  const ext = path.extname(file.originalname).toLowerCase();
  if (!allowedExtensions.includes(ext)) {
    return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", "file"));
  }

  // Validate file size
  const maxSize = 5 * 1024 * 1024; // 5MB (in bytes)
  if (file.size > maxSize) {
    return cb(new multer.MulterError("LIMIT_FILE_SIZE", "file"));
  }

  cb(null, true);
};

const uploads = multer({ storage, fileFilter });

export const uploadRouter = express.Router();

uploadRouter.post("/", checkAuth, uploads.single("file"), uploadFile);

uploadRouter.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof multer.MulterError) {
    const message = err.code === "LIMIT_UNEXPECTED_FILE" ? "The file extension is not valid" : err.message;
    res.status(400).send(message);
  } else {
    res.status(500).send("Failed to upload file");
  }
});
