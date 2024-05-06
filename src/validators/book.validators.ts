import { body } from "express-validator";

export const bookValidators = [
  body("name").isString().trim().notEmpty(),
  body("pagesCount").optional().isInt({ min: 1 }).withMessage("The book must contain at least one page"),
  body("releaseDate").optional().isISO8601().toDate().withMessage("Invalid date format"),
  body("publishYear").optional().isInt({ min: 1 }),
  body("author").optional().isString(),
  body("fileUrl")
    .optional()
    .isURL({ require_tld: false })
    .withMessage("Invalid URL format")
    .custom((value: string) => {
      if (!value.endsWith(".pdf")) throw Error("Allowed only pdf files");
      return true;
    }),
];
