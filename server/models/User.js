import { connection } from "../config/db_config.js";

export const User = {
    create: async (user) => {
        try {
            const stmt = "INSERT INTO users(email, password, role, is_active) VALUES(?, ?, ?, ?)";
            const values = [user.email, user.password, user.role || "student", user.is_active];
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
            const stmt = `
                SELECT user_id, email, password, role, 
                       is_active, last_login, created_at 
                FROM users WHERE email = ?`;
            const [rows] = await connection.query(stmt, [email]);
            return rows[0] || null;
        } catch (error) {
            throw new Error(`Error reading user by email: ${error.message}`);
        }
    },

    update: async (user, user_id) => {
        try {
            const fields = [];
            const values = [];

            if (user.email !== undefined) {
                fields.push("email = ?");
                values.push(user.email);
            };
            if (user.role !== undefined) {
                fields.push("role = ?");
                values.push(user.role);
            };
            if (user.is_active !== undefined) {
                fields.push("is_active = ?");
                values.push(user.is_active);
            };
            if (user.password !== undefined) {
                fields.push("password = ?");
                values.push(user.password);
            };
            if (user.last_login !== undefined) {
                fields.push("last_login = ?");
                values.push(user.last_login);
            };

            if (fields.length === 0) {
                return 0;
            };
            values.push(user_id);
            const stmt = `UPDATE users SET ${fields.join(", ")} WHERE user_id = ?`;
            
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