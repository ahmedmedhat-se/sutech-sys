import { body, param } from "express-validator";

// Export all validation rules as an object
export const authValidation = {
    // Basic login/register validation
    basic: [
        body('email')
            .notEmpty().withMessage("Email field is required.")
            .isEmail().withMessage("Email should be in the form of example@domain")
            .normalizeEmail(),

        body('password')
            .notEmpty().withMessage("Password is required")
            .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
            .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
            .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
            .matches(/\d/).withMessage("Password must contain at least one number")
            .matches(/[@$!%*?&#]/).withMessage("Password must contain at least one special character (@$!%*?&#)"),
    ],

    // Change password validation
    changePassword: [
        body('currentPassword')
            .notEmpty().withMessage("Current password is required"),
        
        body('newPassword')
            .notEmpty().withMessage("New password is required")
            .isLength({ min: 8 }).withMessage("New password must be at least 8 characters")
            .matches(/[A-Z]/).withMessage("New password must contain at least one uppercase letter")
            .matches(/[a-z]/).withMessage("New password must contain at least one lowercase letter")
            .matches(/\d/).withMessage("New password must contain at least one number")
            .matches(/[@$!%*?&#]/).withMessage("New password must contain at least one special character")
            .custom((newPassword, { req }) => {
                if (newPassword === req.body.currentPassword) {
                    throw new Error('New password must be different from current password');
                }
                return true;
            }),
        
        body('confirmPassword')
            .notEmpty().withMessage("Please confirm your new password")
            .custom((value, { req }) => {
                if (value !== req.body.newPassword) {
                    throw new Error('New passwords do not match');
                }
                return true;
            })
    ],

    // Update profile validation
    updateProfile: [
        body('email')
            .optional()
            .trim()
            .isEmail().withMessage("Valid email format required")
            .normalizeEmail(),
        
        body('firstName')
            .optional()
            .trim()
            .isLength({ min: 2, max: 50 }).withMessage("First name must be 2-50 characters")
            .matches(/^[A-Za-z\s'-]+$/).withMessage("First name can only contain letters, spaces, hyphens, and apostrophes"),
        
        body('lastName')
            .optional()
            .trim()
            .isLength({ min: 2, max: 50 }).withMessage("Last name must be 2-50 characters")
            .matches(/^[A-Za-z\s'-]+$/).withMessage("Last name can only contain letters, spaces, hyphens, and apostrophes"),
        
        body('phoneNumber')
            .optional()
            .trim()
            .matches(/^[+]?[0-9\s\-()]+$/).withMessage("Invalid phone number format")
    ],

    // Admin update user validation
    adminUpdate: [
        body('email')
            .optional()
            .trim()
            .isEmail().withMessage("Valid email format required")
            .normalizeEmail(),
        
        body('role')
            .optional()
            .isIn(['student', 'teacher', 'admin', 'registrar', 'admission'])
            .withMessage("Role must be one of: student, teacher, admin, registrar, admission"),
        
        body('is_active')
            .optional()
            .isBoolean().withMessage("is_active must be true or false")
    ],

    // Promote user validation
    promote: [
        body('role')
            .notEmpty().withMessage("Role is required")
            .isIn(['student', 'teacher', 'admin', 'registrar', 'admission'])
            .withMessage("Invalid role"),
        
        body('reason')
            .optional()
            .trim()
            .isLength({ max: 500 }).withMessage("Reason cannot exceed 500 characters")
    ]
};

// Param validation
export const authIdParam = [
    param('user_id').isInt({ min: 1 })
];