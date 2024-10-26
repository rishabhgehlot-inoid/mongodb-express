// middleware/validateTeamMember.js
const { body, validationResult } = require("express-validator");

const validateTeamMember = [
  body("name").notEmpty().withMessage("Name is required"),
  body("position").notEmpty().withMessage("Position is required"),
  body("email").isEmail().withMessage("Email must be valid"),
  body("phone").optional().isString().withMessage("Phone must be a string"),
  body("linkedIn")
    .optional()
    .isURL()
    .withMessage("LinkedIn must be a valid URL"),
  body("twitter").optional().isURL().withMessage("Twitter must be a valid URL"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateTeamMember;
