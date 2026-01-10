import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

export const generateAccessToken = (user) => {
    const payload = {
        user_id: user.user_id,
        email: user.email,
        role: user.role
    };
    
    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN }
    );
};

export const generateRefreshToken = (user) => {
    const payload = {
        user_id: user.user_id
    };
    
    return jwt.sign(
        payload,
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
    );
};

export const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

export const verifyRefreshToken = (token) => {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};