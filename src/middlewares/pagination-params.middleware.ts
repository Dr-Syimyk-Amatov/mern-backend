import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

import { createPaginationValidators } from "../validators";

export const checkPaginationParams = async (req: Request, res: Response, next: NextFunction) => {
  await createPaginationValidators().run(req);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  res.locals.pageIndex = req.query.pageIndex ?? 1;
  res.locals.pageSize = req.query.pageSize ?? 10;

  next();
};
