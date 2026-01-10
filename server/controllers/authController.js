import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwt.js";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

export const authController = {
    register: async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    message: "Email and password are required",
                    success: false
                });
            }

            const existingUser = await User.readByEmail(email);
            if (existingUser) {
                return res.status(409).json({
                    message: "Email already registered. Please login or use different email.",
                    success: false
                });
            };

            const password_hash = await bcrypt.hash(password, 10);

            const userId = await User.create({
                email,
                password: password_hash,
                role: "student",
                is_active: true
            });

            const newUserRows = await User.readById(userId);
            const newUser = newUserRows[0];

            const accessToken = generateAccessToken(newUser);
            const refreshToken = generateRefreshToken(newUser);

            res.cookie('refresh_token', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
                maxAge: 24 * 60 * 60 * 1000,
                path: '/api/auth/refresh'
            });

            const { password: userPassword, ...userWithoutPassword } = newUser;

            return res.status(201).json({
                message: "User registered successfully.",
                success: true,
                accessToken,
                user: userWithoutPassword
            });
        } catch (error) {
            console.error(`Registration error: ${error.message}`);
            return res.status(500).json({
                message: "Internal server error",
                success: false
            });
        };
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    message: "Email and password are required",
                    success: false
                });
            }

            const user = await User.readByEmail(email);
            if (!user) {
                return res.status(401).json({
                    message: "Invalid email or password",
                    success: false
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({
                    message: "Invalid email or password",
                    success: false
                });
            };

            await User.update({ last_login: new Date() }, user.user_id);

            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);

            res.cookie('refresh_token', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
                maxAge: 24 * 60 * 60 * 1000,
                path: '/api/auth/refresh'
            });

            const { password: userPassword, ...userWithoutPassword } = user;

            return res.status(200).json({
                message: "Login successful",
                success: true,
                accessToken,
                user: userWithoutPassword
            });

        } catch (error) {
            console.error(`Login error: ${error.message}`);
            return res.status(500).json({
                message: "Internal server error",
                success: false
            });
        };
    },

    refreshToken: async (req, res) => {
        try {
            const refreshToken = req.cookies?.refresh_token;
            if (!refreshToken) {
                return res.status(401).json({
                    message: "No refresh token provided",
                    success: false
                });
            };

            let decoded;
            try {
                decoded = verifyRefreshToken(refreshToken);
            } catch (error) {
                res.clearCookie('refresh_token', {
                    path: '/api/auth/refresh'
                });

                return res.status(401).json({
                    message: "Invalid or expired refresh token",
                    success: false
                });
            }

            const userRows = await User.readById(decoded.user_id);
            if (!userRows || userRows.length === 0 || !userRows[0].is_active) {
                res.clearCookie('refresh_token', {
                    path: '/api/auth/refresh'
                });

                return res.status(401).json({
                    message: "User account no longer active",
                    success: false
                });
            };

            const user = userRows[0];
            const newAccessToken = generateAccessToken(user);
            const newRefreshToken = generateRefreshToken(user);

            res.cookie('refresh_token', newRefreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
                maxAge: 24 * 60 * 60 * 1000,
                path: '/api/auth/refresh'
            });

            return res.status(200).json({
                message: "Token refreshed",
                success: true,
                accessToken: newAccessToken
            });

        } catch (error) {
            console.error(`Refresh token error: ${error.message}`);
            return res.status(500).json({
                message: "Internal server error",
                success: false
            });
        }
    },

    logout: (req, res) => {
        try {
            res.clearCookie('refresh_token', {
                path: '/api/auth/refresh'
            });

            res.json({
                message: "User logged-out successfully.",
                success: true
            });
        } catch (error) {
            console.error(`Internal server error occurred: ${error.message}`);
            res.status(500).json({
                message: "Internal Server Error",
                success: false
            });
        };
    },

    getProfile: async (req, res) => {
        try {
            const userId = req.user?.user_id;

            if (!userId) {
                return res.status(401).json({
                    message: "Not authenticated",
                    success: false
                });
            }

            const userRows = await User.readById(userId);

            if (!userRows || userRows.length === 0) {
                return res.status(404).json({
                    message: "User not found",
                    success: false
                });
            }
            const { password, ...userWithoutPassword } = userRows[0];
            return res.status(200).json({
                message: "Profile retrieved",
                success: true,
                user: userWithoutPassword
            });

        } catch (error) {
            console.error(`Get profile error: ${error.message}`);
            return res.status(500).json({
                message: "Internal server error",
                success: false
            });
        };
    },

    changePassword: async (req, res) => {
        try {
            const { currentPassword, newPassword } = req.body;
            const userId = req.user.user_id;
            const userRows = await User.readById(userId);
            if (!userRows || userRows.length === 0) {
                return res.status(404).json({
                    message: "User not found",
                    success: false
                });
            };

            const user = userRows[0];
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.status(401).json({
                    message: "Current password is incorrect",
                    success: false
                });
            };

            const newPasswordHash = await bcrypt.hash(newPassword, 10);
            await User.update({ password: newPasswordHash }, userId);

            res.clearCookie('refresh_token', {
                path: '/api/auth/refresh'
            });

            return res.status(200).json({
                message: "Password changed successfully. Please login again.",
                success: true
            });

        } catch (error) {
            console.error(`Change password error: ${error.message}`);
            return res.status(500).json({
                message: "Internal server error",
                success: false
            });
        }
    },

    updateProfile: async (req, res) => {
        try {
            const userId = req.user.user_id;
            const updates = req.body;
            const updated = await User.update(updates, userId);

            if (!updated) {
                return res.status(404).json({
                    message: "User not found",
                    success: false
                });
            }

            const updatedUserRows = await User.readById(userId);
            const { password, ...userWithoutPassword } = updatedUserRows[0];

            return res.status(200).json({
                message: "Profile updated successfully",
                success: true,
                user: userWithoutPassword
            });

        } catch (error) {
            console.error(`Update profile error: ${error.message}`);
            return res.status(500).json({
                message: "Internal server error",
                success: false
            });
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const users = await User.read();
            const usersWithoutPasswords = users.map(user => {
                const { password, ...userWithoutPassword } = user;
                return userWithoutPassword;
            });

            return res.status(200).json({
                message: "Users retrieved successfully",
                success: true,
                users: usersWithoutPasswords
            });

        } catch (error) {
            console.error(`Get all users error: ${error.message}`);
            return res.status(500).json({
                message: "Internal server error",
                success: false
            });
        }
    },

    getUserById: async (req, res) => {
        try {
            const { user_id } = req.params;
            const userRows = await User.readById(user_id);

            if (!userRows || userRows.length === 0) {
                return res.status(404).json({
                    message: "User not found",
                    success: false
                });
            }

            const { password, ...userWithoutPassword } = userRows[0];
            return res.status(200).json({
                message: "User retrieved successfully",
                success: true,
                user: userWithoutPassword
            });

        } catch (error) {
            console.error(`Get user by ID error: ${error.message}`);
            return res.status(500).json({
                message: "Internal server error",
                success: false
            });
        };
    },

    promoteUser: async (req, res) => {
        try {
            const { user_id } = req.params;
            const { role } = req.body;

            const updated = await User.update({ role }, user_id);

            if (!updated) {
                return res.status(404).json({
                    message: "User not found",
                    success: false
                });
            }

            return res.status(200).json({
                message: `User promoted to ${role} successfully`,
                success: true
            });

        } catch (error) {
            console.error(`Promote user error: ${error.message}`);
            return res.status(500).json({
                message: "Internal server error",
                success: false
            });
        }
    },

    updateUser: async (req, res) => {
        try {
            const { user_id } = req.params;
            const updates = req.body;

            const updated = await User.update(updates, user_id);

            if (!updated) {
                return res.status(404).json({
                    message: "User not found",
                    success: false
                });
            }

            return res.status(200).json({
                message: "User updated successfully",
                success: true
            });

        } catch (error) {
            console.error(`Update user error: ${error.message}`);
            return res.status(500).json({
                message: "Internal server error",
                success: false
            });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { user_id } = req.params;

            const deleted = await User.delete(user_id);

            if (!deleted) {
                return res.status(404).json({
                    message: "User not found",
                    success: false
                });
            }

            return res.status(200).json({
                message: "User deleted successfully",
                success: true
            });

        } catch (error) {
            console.error(`Delete user error: ${error.message}`);
            return res.status(500).json({
                message: "Internal server error",
                success: false
            });
        };
    }
};