import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

import { createOptionalSortValidators } from "../validators";
import { getSortOrderValue } from "../utils";
import { SortOrder } from "../enums";

export const checkSortParams = (keys: string[]) => async (req: Request, res: Response, next: NextFunction) => {
  await createOptionalSortValidators(keys).run(req);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  res.locals.hasSortParams = "sortKey" in req.query && "sortOrder" in req.query;

  if (res.locals.hasSortParams) {
    res.locals.sortOrder = getSortOrderValue(req.query.sortOrder as SortOrder);
  }

  next();
};
