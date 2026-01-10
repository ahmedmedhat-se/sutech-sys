import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import authRouter from "./routes/authRoutes.route.js";
import studentRouter from "./routes/studentRoutes.routes.js";

dotenv.config;

const app = express();
const PORT = process.env.PORT;

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: process.env.CORS_CREDENTIALS,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(morgan(process.env.NODE_ENV == "production" ? "combined" : "dev"));

app.use('/api/auth', authRouter);
app.use('/api/students', studentRouter);

app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'SUTech SYS API is running',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        environment: process.env.NODE_ENV
    });
});

app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Endpoint ${req.method} ${req.originalUrl} not found`
    });
});

app.use((err, req, res, next) => {
    console.error(`Server Error: ${err.stack}`);
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            message: "Validation Error",
            errors: err.errors
        });
    }
    
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
        return res.status(401).json({
            success: false,
            message: "Authentication failed"
        });
    }
    
    res.status(500).json({
        success: false,
        message: "Internal server error",
        ...(process.env.NODE_ENV === 'development' && { error: err.message })
    });
});

app.listen(PORT, () => {
    console.log(`✅ Server running on: http://localhost:${PORT}`);
    console.log(`🌍 Frontend URL: ${process.env.FRONTEND_URL}`);
    console.log(`🗄️  Database: ${process.env.DB_NAME}@${process.env.DB_HOST}`);
    console.log(`🚀 Started at: ${new Date().toLocaleString()}`);
    console.log(`⚙️  Environment: ${process.env.NODE_ENV}`);
});