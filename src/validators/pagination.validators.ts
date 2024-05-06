import { checkSchema, query } from "express-validator";

export const paginationValidators = [
  query("pageIndex").optional().isInt({ min: 1 }),
  query("pageSize").optional().isInt({ min: 1 }),
];

export const createPaginationValidators = () =>
  checkSchema(
    {
      pageIndex: {
        optional: true,
        isInt: {
          options: [{ min: 1 }],
        },
      },
      pageSize: {
        optional: true,
        isInt: {
          options: [{ min: 1 }],
        },
      },
    },
    ["query"]
  );
