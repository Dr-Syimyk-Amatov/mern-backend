import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export function checkAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace(/Bearer\s?/, "");
  if (token) {
    try {
      const { _id } = jwt.verify(token, "secret123") as JwtPayload;
      res.locals.userId = _id;
      next();
    } catch (error) {
      return res.status(405).json({
        message: "Not allowed",
      });
    }
  } else {
    return res.status(405).json({
      message: "Not allowed",
    });
  }
}
