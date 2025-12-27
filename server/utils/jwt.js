import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { config, validateConfig } from "../config/index.js";

dotenv.config();
validateConfig();

export const genereateTokens = (user) => {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return { accessToken, refreshToken };
};

export const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        config.jwt.secret,
        { 
            expiresIn: config.jwt.accessExpiresIn,
            issuer: "sutech-api",
            audience: "sutech-client"
        }
    )
};

export const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        config.jwt.refreshSecret,
        { 
            expiresIn: config.jwt.refreshExpiresIn,
            issuer: "sutech-api",
            audience: "sutech-client"
        }
    )
};

export const verifyAccessToken = (token) => {
    try {
        return jwt.verify(token, config.jwt.secret);
    } catch (error){
        console.error(`Access Token Verification Error: ${error.message}`);
        return null;
    }
};

export const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(token, config.jwt.refreshSecret);
    } catch (error) {
        console.error(`Refresh Token Verification Error: ${error.message}`)
        return null;
    }
};