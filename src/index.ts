import express, { Express, Request, Response } from "express";

const app = express();
const port = 4444;
const jsonParser = express.json();

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Express App</h1>");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

console.log("sda");
