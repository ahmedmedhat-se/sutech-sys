import { connection } from "../config/db_config.js";

export const User = {
    create: async (user) => {
        try {
            const stmt = "INSERT INTO users(email, password_hash, role, is_active) VALUES(?, ?, ?, ?)";
            const values = [user.email, user.password_hash, "student", user.is_active];
            const [result] = await connection.query(stmt, values);
            return result.insertId;
        } catch (error) {
            throw new Error(`Error occurred while creating user: ${error}`);
        };
    },

    read: async () => {
        try {
            const stmt = "SELECT * FROM users";
            const [rows] = await connection.execute(stmt);
            return rows;
        } catch (error) {
            throw new Error(`Error occurred while reading data: ${error}`);
        };
    },

    readById: async (user_id) => {
        try {
            const stmt = "SELECT * FROM users WHERE user_id = ?";
            const [rows] = await connection.query(stmt, [user_id]);
            if (!rows || rows.length <= 0) {
                throw new Error("There is an error in your user id.")
            };
            return rows;
        } catch (error) {
            throw new Error(`Error occurred while reading data: ${error}`);
        };
    },

    readByEmail: async (email) => {
        try {
            const stmt = "SELECT * FROM users WHERE email = ?";
            const [rows] = await connection.query(stmt, [email]);
            if (!rows || rows.length <= 0) {
                throw new Error("There is an error in your user id.")
            };
            return rows;
        } catch (error) {
            throw new Error(`Error occurred while reading data: ${error}`);
        };
    },

    update: async (user, user_id) => {
        try {
            const stmt = "UPDATE users SET email = ?, role = ?, is_active = ? WHERE user_id = ?";
            const values = [user.email, user.role, user.is_active, user_id];
            const [result] = await connection.query(stmt, values);
            return result.affectedRows;
        } catch (error) {
            throw new Error(`Error occurred while updating data: ${error}`);
        };
    },

    delete: async (user_id) => {
        try {
            const stmt = "DELETE FROM users WHERE user_id = ?";
            const [result] = await connection.query(stmt, [user_id]);
            return result.affectedRows;
        } catch (error) {
            throw new Error(`Error occurred while deleting data: ${error}`);
        };
    }
};