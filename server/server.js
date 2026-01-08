import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { config, validateConfig } from "./config/index.js";

dotenv.config();
validateConfig();

const app = express();
const PORT = config.port;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: config.cors.origin,
    credentials: config.cors.credentials
}));

app.use(morgan(config.nodeEnv == "production" ? "combined" : "dev"));

app.get("/api/welcoeme", (req, res) => {
    
});

app.use((req, res, next) => {
    res.status(404).json({
        message: "Endpoint not found.",
        success: false
    });
});

app.use((err, req, res, next) => {
    console.error(`Internal Server Error Found: ${err}`);
    res.status(500).json({
        message: "Internal server error.",
        success: false
    });
});

app.listen(PORT, () => {
    console.log(`The server is running on port: http://localhost:${PORT}`);
    console.log(`Frontend URL: ${config.frontend.url}`);
    console.log(`Database: ${config.db.name}@${config.db.host}`);
    console.log(`Started at: ${new Date().toISOString()}`);
});