import { body, param } from "express-validator";

export const authValidation = [
    body('email')
        .notEmpty().withMessage("Email field is required.")
        .isEmail().withMessage("Email should be in the form of example@domain")
        .normalizeEmail(),

    body('password_hash')
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
        .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
        .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
        .matches(/\d/).withMessage("Password must contain at least one number")
        .matches(/[@$!%*?&#]/).withMessage("Password must contain at least one special character (@$!%*?&#)"),
];

export const authIdParam = [
    param('user_id').isInt({ min: 1 })
];