import { body, param } from "express-validator";
import { SortOrder } from "../enums";

export const getPrioritiesValidators = [
  param("sortKey").optional().isString().isIn(["title", "colors.primary", "colors.secondary"]),
  param("sortOrder").optional().isString().isIn([SortOrder.Asc, SortOrder.Desc]),
];

export const priorityValidators = [
  body("title").exists(),
  body("colors.primary").exists().isHexColor(),
  body("colors.secondary").exists().isHexColor(),
  body("default").optional(),
];
