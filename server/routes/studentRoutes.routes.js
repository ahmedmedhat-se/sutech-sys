import express from 'express';
import { studentController } from '../controllers/studentController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { roleMiddleware } from '../middlewares/roleMiddleware.js';
import { validateMiddleware } from '../middlewares/validateMiddleware.js';
import { studentValidation } from '../validations/studentValidation.js';

const studentRouter = express.Router();
studentRouter.use(authMiddleware);

// ==================== PUBLIC ROUTES (for authenticated users) ====================
// Get my student profile (Student only)
studentRouter.get('/profile',
    roleMiddleware.studentsOnly,
    studentController.getMyProfile
);

// ==================== STAFF ROUTES (Registrar & Admission) ====================
// Create student (Registrar only)
studentRouter.post('/',
    roleMiddleware.staffOnly,
    validateMiddleware(studentValidation.create),
    studentController.create
);

// Get all students (with filters)
studentRouter.get('/',
    roleMiddleware.staffOnly,
    validateMiddleware(studentValidation.query),
    studentController.getAll
);

// Search students
studentRouter.get('/search',
    (req, res, next) => {
        const allowedRoles = ['admin', 'registrar', 'admission', 'teacher'];
        if (req.user && allowedRoles.includes(req.user.role)) {
            return next();
        }
        return res.status(403).json({ 
            message: "Access denied", 
            success: false 
        });
    },
    studentController.search
);

// Update student (Registrar only)
studentRouter.put('/:student_id',
    roleMiddleware.staffOnly,
    validateMiddleware(studentValidation.params),
    validateMiddleware(studentValidation.update),
    studentController.update
);

// Withdraw student (soft delete - Registrar only)
studentRouter.put('/:student_id/withdraw',
    roleMiddleware.staffOnly,
    validateMiddleware(studentValidation.params),
    studentController.withdraw
);

// ==================== ADMIN-ONLY ROUTES ====================
// Delete student permanently (Admin only)
studentRouter.delete('/:student_id',
    roleMiddleware.adminsOnly,
    validateMiddleware(studentValidation.params), 
    studentController.delete
);

// Get student statistics (Admin only)
studentRouter.get('/statistics',
    roleMiddleware.adminsOnly,
    studentController.getStatistics
);

// ==================== SHARED ROUTES ====================
// Get student by ID (Admin, Registrar, Admission, Student - own data)
studentRouter.get('/:student_id',
    validateMiddleware(studentValidation.params),
    studentController.getById
);

export default studentRouter;