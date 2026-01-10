import { body, param, query } from "express-validator";
import { Student } from "../models/Student.js";

export const studentValidation = {
    /**
     * Create student validation
     */
    create: [
        body('user_id')
            .notEmpty().withMessage("User ID is required")
            .isInt({ min: 1 }).withMessage("User ID must be a positive integer"),
        
        body('first_name')
            .notEmpty().withMessage("First name is required")
            .trim()
            .isLength({ min: 2, max: 50 }).withMessage("First name must be 2-50 characters")
            .matches(/^[A-Za-z\s'-]+$/).withMessage("First name can only contain letters, spaces, hyphens, and apostrophes"),
        
        body('last_name')
            .notEmpty().withMessage("Last name is required")
            .trim()
            .isLength({ min: 2, max: 50 }).withMessage("Last name must be 2-50 characters")
            .matches(/^[A-Za-z\s'-]+$/).withMessage("Last name can only contain letters, spaces, hyphens, and apostrophes"),
        
        body('student_code')
            .optional()
            .trim()
            .isLength({ min: 5, max: 20 }).withMessage("Student code must be 5-20 characters")
            .custom(async (code) => {
                if (code) {
                    const exists = await Student.readByStudentCode(code);
                    if (exists) {
                        throw new Error('Student code already exists');
                    }
                }
                return true;
            }),
        
        body('date_of_birth')
            .optional()
            .isISO8601().withMessage("Date of birth must be in YYYY-MM-DD format")
            .custom((dob) => {
                const birthDate = new Date(dob);
                const minDate = new Date();
                minDate.setFullYear(minDate.getFullYear() - 100);
                const maxDate = new Date();
                maxDate.setFullYear(maxDate.getFullYear() - 16);
                
                if (birthDate < minDate) {
                    throw new Error('Date of birth is too far in the past');
                }
                if (birthDate > maxDate) {
                    throw new Error('Student must be at least 16 years old');
                }
                return true;
            }),
        
        body('gender')
            .optional()
            .isIn(['Male', 'Female', 'Other']).withMessage("Gender must be Male, Female, or Other"),
        
        body('program_id')
            .notEmpty().withMessage("Program ID is required")
            .isInt({ min: 1 }).withMessage("Program ID must be a positive integer"),
        
        body('enrollment_status')
            .optional()
            .isIn(['Active', 'Graduated', 'Suspended', 'Withdrawn', 'On Leave'])
            .withMessage("Invalid enrollment status"),
        
        body('academic_status')
            .optional()
            .isIn(['Good Standing', 'Probation', 'Warning', 'Dismissed'])
            .withMessage("Invalid academic status"),
        
        body('current_level')
            .optional()
            .isInt({ min: 1, max: 5 }).withMessage("Current level must be between 1 and 5"),
        
        body('scholarship_type')
            .optional()
            .isIn(['None', 'Merit-based', 'Need-based', 'Sports', 'Research', 'Full'])
            .withMessage("Invalid scholarship type"),
        
        body('scholarship_percentage')
            .optional()
            .isFloat({ min: 0, max: 100 }).withMessage("Scholarship percentage must be between 0 and 100")
    ],

    /**
     * Update student validation
     */
    update: [
        body('first_name')
            .optional()
            .trim()
            .isLength({ min: 2, max: 50 }).withMessage("First name must be 2-50 characters"),
        
        body('last_name')
            .optional()
            .trim()
            .isLength({ min: 2, max: 50 }).withMessage("Last name must be 2-50 characters"),
        
        body('student_code')
            .optional()
            .trim()
            .isLength({ min: 5, max: 20 }).withMessage("Student code must be 5-20 characters")
            .custom(async (code, { req }) => {
                if (code) {
                    const student = await Student.readById(req.params.student_id);
                    if (student && student.student_code !== code) {
                        const exists = await Student.readByStudentCode(code);
                        if (exists) {
                            throw new Error('Student code already exists');
                        }
                    }
                }
                return true;
            }),
        
        body('enrollment_status')
            .optional()
            .isIn(['Active', 'Graduated', 'Suspended', 'Withdrawn', 'On Leave'])
            .withMessage("Invalid enrollment status"),
        
        body('academic_status')
            .optional()
            .isIn(['Good Standing', 'Probation', 'Warning', 'Dismissed'])
            .withMessage("Invalid academic status"),
        
        body('gpa')
            .optional()
            .isFloat({ min: 0, max: 4 }).withMessage("GPA must be between 0.00 and 4.00"),
        
        body('cgpa')
            .optional()
            .isFloat({ min: 0, max: 4 }).withMessage("CGPA must be between 0.00 and 4.00"),
        
        body('scholarship_percentage')
            .optional()
            .isFloat({ min: 0, max: 100 }).withMessage("Scholarship percentage must be between 0 and 100")
    ],

    /**
     * Parameter validation
     */
    params: [
        param('student_id')
            .notEmpty().withMessage("Student ID is required")
            .isInt({ min: 1 }).withMessage("Student ID must be a positive integer")
    ],

    /**
     * Query validation for filters
     */
    query: [
        query('page')
            .optional()
            .isInt({ min: 1 }).withMessage("Page must be a positive integer")
            .default(1),
        
        query('limit')
            .optional()
            .isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100")
            .default(20),
        
        query('program_id')
            .optional()
            .isInt({ min: 1 }).withMessage("Program ID must be a positive integer"),
        
        query('enrollment_status')
            .optional()
            .isIn(['Active', 'Graduated', 'Suspended', 'Withdrawn', 'On Leave'])
            .withMessage("Invalid enrollment status"),
        
        query('academic_status')
            .optional()
            .isIn(['Good Standing', 'Probation', 'Warning', 'Dismissed'])
            .withMessage("Invalid academic status"),
        
        query('current_level')
            .optional()
            .isInt({ min: 1, max: 5 }).withMessage("Current level must be between 1 and 5"),
        
        query('search')
            .optional()
            .trim()
            .isLength({ max: 100 }).withMessage("Search term cannot exceed 100 characters")
    ]
};