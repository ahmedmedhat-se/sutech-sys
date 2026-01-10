import express from 'express';
import { authController } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { roleMiddleware } from '../middlewares/roleMiddleware.js';
import { validateMiddleware } from '../middlewares/validateMiddleware.js';
import { authValidation, authIdParam } from '../validations/authValidation.js';

const authRouter = express.Router();

// ==================== PUBLIC ROUTES ====================
/**
 * @route   POST /api/auth/register
 * @desc    Register new student
 * @access  Public
 */
authRouter.post('/register',
    validateMiddleware(authValidation.basic),
    authController.register
);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
authRouter.post('/login',
    validateMiddleware(authValidation.basic),
    authController.login
);

/**
 * @route   POST /api/auth/refresh
 * @desc    Refresh access token
 * @access  Public
 */
authRouter.post('/refresh',
    authController.refreshToken
);

// ==================== PROTECTED ROUTES ====================
/**
 * @route   POST /api/auth/logout
 * @desc    Logout user
 * @access  Private
 */
authRouter.post('/logout',
    authMiddleware,
    authController.logout
);

/**
 * @route   GET /api/auth/profile
 * @desc    Get current user profile
 * @access  Private
 */
authRouter.get('/profile',
    authMiddleware,
    authController.getProfile
);

/**
 * @route   PUT /api/auth/change-password
 * @desc    Change password
 * @access  Private
 */
authRouter.put('/change-password',
    authMiddleware,
    validateMiddleware(authValidation.changePassword),
    authController.changePassword
);

/**
 * @route   PUT /api/auth/profile
 * @desc    Update user profile
 * @access  Private
 */
authRouter.put('/profile',
    authMiddleware,
    validateMiddleware(authValidation.updateProfile),
    authController.updateProfile
);

// ==================== ADMIN ROUTES ====================
/**
 * @route   GET /api/auth/users
 * @desc    Get all users (Admin only)
 * @access  Private (Admin)
 */
authRouter.get('/users',
    authMiddleware,
    roleMiddleware.adminsOnly,
    authController.getAllUsers
);

/**
 * @route   GET /api/auth/users/:user_id
 * @desc    Get user by ID (Admin only)
 * @access  Private (Admin)
 */
authRouter.get('/users/:user_id',
    authMiddleware,
    roleMiddleware.adminsOnly,
    validateMiddleware(authIdParam),
    authController.getUserById
);

/**
 * @route   PUT /api/auth/users/:user_id/promote
 * @desc    Promote user role (Admin only)
 * @access  Private (Admin)
 */
authRouter.put('/users/:user_id/promote',
    authMiddleware,
    roleMiddleware.adminsOnly,
    validateMiddleware(authIdParam),
    validateMiddleware(authValidation.promote),
    authController.promoteUser
);

/**
 * @route   PUT /api/auth/users/:user_id
 * @desc    Update user (Admin only)
 * @access  Private (Admin)
 */
authRouter.put('/users/:user_id',
    authMiddleware,
    roleMiddleware.adminsOnly,
    validateMiddleware(authIdParam),
    validateMiddleware(authValidation.adminUpdate),
    authController.updateUser
);

/**
 * @route   DELETE /api/auth/users/:user_id
 * @desc    Delete user (Admin only)
 * @access  Private (Admin)
 */
authRouter.delete('/users/:user_id',
    authMiddleware,
    roleMiddleware.adminsOnly,
    validateMiddleware(authIdParam),
    authController.deleteUser
);

export default authRouter;