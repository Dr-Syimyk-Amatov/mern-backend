import { checkSchema, query } from "express-validator";

import { SortOrder } from "../enums";

export const createOptionalSortValidators = <T extends string>(keys: T[]) =>
  checkSchema(
    {
      sortOrder: {
        optional: true,
        isIn: {
          options: [[SortOrder.Asc, SortOrder.Desc]],
        },
      },
      sortKey: {
        optional: true,
        isIn: {
          options: [keys],
        },
      },
      query: {
        custom: {
          options: (_, meta) => {
            const hasSortKey = Boolean(meta.req.query?.sortKey);
            const hasSortOrder = Boolean(meta.req.query?.sortOrder);
            if ((!hasSortKey && !hasSortOrder) || (hasSortKey && hasSortOrder)) return "carl";
            throw Error("Expected both sortKey and sortOrder query params");
          },
        },
      },
    },
    ["query"]
  );

export const createSortValidators = <T extends string>(keys: T[]) => [
  query("sortOrder").isIn([SortOrder.Asc, SortOrder.Desc]),
  query("sortKey").isIn(keys),
];
