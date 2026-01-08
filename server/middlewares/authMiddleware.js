import { verifyAccessToken } from "../utils/jwt.js";

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({
            message: "Forbidden. No token provided.",
            success: false
        });
    };

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access denied. Invalid token format."
        });
    };

    try {
        const decoded = verifyAccessToken(token);

        if (!decoded) {
            return res.status(401).json({
                message: "Invalid or expired token.",
                success: false
            });
        };

        req.user = decoded;
        next();
        
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: "Access denied. Token has expired."
            });
        }

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: "Access denied. Invalid token."
            });
        }

        console.error('Auth middleware error:', error);
        return res.status(500).json({
            success: false,
            message: "Internal server error during authentication."
        });
    };
};