import mysql from "mysql2";
import dotenv from "dotenv";
import { config, validateConfig } from "../config/index.js";

dotenv.config();
validateConfig();

export const connection = mysql.createPool({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.name,
    port: config.db.port,
    connectionLimit: 20,
    queueLimit: 5,
    waitForConnections: true
});