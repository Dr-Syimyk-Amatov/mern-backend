import express, { Request, Response } from "express";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";

import { authRouter, booksRouter, postsRouter, priorityRouter, projectRouter, uploadRouter } from "./routers";

const app = express();
const port = 4444;

mongoose
  .connect("mongodb+srv://Syimyk:ZypGkblvEniaaGX0@cluster0.ukj07eh.mongodb.net/blog?retryWrites=true&w=majority")
  .then(() => console.log("Database has been conected"))
  .catch((err) => console.log("Database conection failed", err));

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Express App</h1>");
});

app.use("/auth", authRouter);
app.use("/posts", postsRouter);
app.use("/upload", uploadRouter);
app.use("/priority", priorityRouter);
app.use("/projects", projectRouter);
app.use("/books", booksRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
