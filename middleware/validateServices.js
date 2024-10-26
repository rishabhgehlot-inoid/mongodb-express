// middlewares/serviceValidation.js
const { body, validationResult } = require("express-validator");

// Validation rules for Service
const serviceValidation = [
  body("title")
    .notEmpty()
    .withMessage("Title is required.")
    .isString()
    .withMessage("Title must be a string."),
  body("description")
    .notEmpty()
    .withMessage("Description is required.")
    .isString()
    .withMessage("Description must be a string."),
  body("shortVideo")
    .optional()
    .isURL()
    .withMessage("Short video must be a valid URL."),
  body("longVideo")
    .optional()
    .isURL()
    .withMessage("Long video must be a valid URL."),
  body("images")
    .optional()
    .isArray()
    .withMessage("Images must be an array.")
    .custom((value) => {
      if (
        !value.every((url) => typeof url === "string" && url.startsWith("http"))
      ) {
        throw new Error("All images must be valid URLs.");
      }
      return true;
    }),
  body("category")
    .notEmpty()
    .withMessage("Category is required.")
    .isString()
    .withMessage("Category must be a string."),
];

// Error handling middleware
const validateService = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { serviceValidation, validateService };
