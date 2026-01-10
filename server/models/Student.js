import { connection } from "../config/db_config.js";

export const Student = {
    /**
     * Create new student record
     */
    create: async (studentData) => {
        try {
            const stmt = `
                INSERT INTO students (
                    user_id, student_code, first_name, last_name, 
                    date_of_birth, gender, nationality, phone_number, address,
                    program_id, admission_date, enrollment_status, academic_status,
                    current_level, scholarship_type, scholarship_percentage,
                    emergency_contact_name, emergency_contact_phone
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            
            const values = [
                studentData.user_id,
                studentData.student_code,
                studentData.first_name,
                studentData.last_name,
                studentData.date_of_birth,
                studentData.gender,
                studentData.nationality,
                studentData.phone_number,
                studentData.address,
                studentData.program_id,
                studentData.admission_date || new Date(),
                studentData.enrollment_status || 'Active',
                studentData.academic_status || 'Good Standing',
                studentData.current_level || 1,
                studentData.scholarship_type || 'None',
                studentData.scholarship_percentage || 0.00,
                studentData.emergency_contact_name,
                studentData.emergency_contact_phone
            ];
            
            const [result] = await connection.execute(stmt, values);
            return result.insertId;
            
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new Error('Student code already exists');
            }
            throw new Error(`Error creating student: ${error.message}`);
        }
    },

    /**
     * Get all students with filters and pagination
     */
    readAll: async (filters = {}, page = 1, limit = 20) => {
        try {
            let stmt = `
                SELECT s.*, 
                       u.email, u.role, u.is_active,
                       p.program_name, p.program_code,
                       d.department_name, d.department_code
                FROM students s
                JOIN users u ON s.user_id = u.user_id
                LEFT JOIN programs p ON s.program_id = p.program_id
                LEFT JOIN departments d ON p.department_id = d.department_id
                WHERE 1=1
            `;
            
            const params = [];
            const offset = (page - 1) * limit;
            
            if (filters.program_id) {
                stmt += ' AND s.program_id = ?';
                params.push(filters.program_id);
            }
            
            if (filters.enrollment_status) {
                stmt += ' AND s.enrollment_status = ?';
                params.push(filters.enrollment_status);
            }
            
            if (filters.academic_status) {
                stmt += ' AND s.academic_status = ?';
                params.push(filters.academic_status);
            }
            
            if (filters.current_level) {
                stmt += ' AND s.current_level = ?';
                params.push(filters.current_level);
            }
            
            if (filters.search) {
                stmt += ' AND (s.first_name LIKE ? OR s.last_name LIKE ? OR s.student_code LIKE ?)';
                const searchTerm = `%${filters.search}%`;
                params.push(searchTerm, searchTerm, searchTerm);
            }
            
            stmt += ' ORDER BY s.created_at DESC LIMIT ? OFFSET ?';
            params.push(limit, offset);
            
            const [rows] = await connection.execute(stmt, params);
            let countStmt = `
                SELECT COUNT(*) as total 
                FROM students s
                JOIN users u ON s.user_id = u.user_id
                WHERE 1=1
            `;
            
            const countParams = [];
            
            // Reapply filters for count
            if (filters.program_id) {
                countStmt += ' AND s.program_id = ?';
                countParams.push(filters.program_id);
            }
            
            if (filters.enrollment_status) {
                countStmt += ' AND s.enrollment_status = ?';
                countParams.push(filters.enrollment_status);
            }
            
            const [countResult] = await connection.execute(countStmt, countParams);
            
            return {
                students: rows,
                pagination: {
                    total: countResult[0].total,
                    page,
                    limit,
                    totalPages: Math.ceil(countResult[0].total / limit)
                }
            };
            
        } catch (error) {
            throw new Error(`Error fetching students: ${error.message}`);
        }
    },

    /**
     * Get student by ID
     */
    readById: async (student_id) => {
        try {
            const stmt = `
                SELECT s.*, 
                       u.email, u.role, u.is_active,
                       p.program_name, p.program_code,
                       d.department_name, d.department_code
                FROM students s
                JOIN users u ON s.user_id = u.user_id
                LEFT JOIN programs p ON s.program_id = p.program_id
                LEFT JOIN departments d ON p.department_id = d.department_id
                WHERE s.student_id = ?
            `;
            
            const [rows] = await connection.execute(stmt, [student_id]);
            return rows[0] || null;
            
        } catch (error) {
            throw new Error(`Error fetching student: ${error.message}`);
        }
    },

    /**
     * Get student by user ID
     */
    readByUserId: async (user_id) => {
        try {
            const stmt = `
                SELECT s.*, 
                       u.email, u.role, u.is_active,
                       p.program_name, p.program_code
                FROM students s
                JOIN users u ON s.user_id = u.user_id
                LEFT JOIN programs p ON s.program_id = p.program_id
                WHERE s.user_id = ?
            `;
            
            const [rows] = await connection.execute(stmt, [user_id]);
            return rows[0] || null;
            
        } catch (error) {
            throw new Error(`Error fetching student by user ID: ${error.message}`);
        }
    },

    /**
     * Get student by student code
     */
    readByStudentCode: async (student_code) => {
        try {
            const stmt = `
                SELECT s.*, 
                       u.email, u.role, u.is_active
                FROM students s
                JOIN users u ON s.user_id = u.user_id
                WHERE s.student_code = ?
            `;
            
            const [rows] = await connection.execute(stmt, [student_code]);
            return rows[0] || null;
            
        } catch (error) {
            throw new Error(`Error fetching student by code: ${error.message}`);
        }
    },

    /**
     * Update student
     */
    update: async (student_id, updateData) => {
        try {
            const allowedFields = [
                'first_name', 'last_name', 'date_of_birth', 'gender',
                'nationality', 'phone_number', 'address', 'program_id',
                'enrollment_status', 'academic_status', 'current_level',
                'gpa', 'cgpa', 'total_passed_ch', 'total_registered_ch',
                'total_remaining_ch', 'scholarship_type', 'scholarship_percentage',
                'emergency_contact_name', 'emergency_contact_phone'
            ];
            
            const fields = [];
            const values = [];
            
            Object.keys(updateData).forEach(key => {
                if (allowedFields.includes(key)) {
                    fields.push(`${key} = ?`);
                    values.push(updateData[key]);
                }
            });
            
            if (fields.length === 0) {
                return 0;
            }
            
            values.push(student_id);
            const stmt = `UPDATE students SET ${fields.join(', ')} WHERE student_id = ?`;
            
            const [result] = await connection.execute(stmt, values);
            return result.affectedRows;
            
        } catch (error) {
            throw new Error(`Error updating student: ${error.message}`);
        }
    },

    /**
     * Delete student (soft delete by updating enrollment_status)
     */
    softDelete: async (student_id) => {
        try {
            const stmt = `
                UPDATE students 
                SET enrollment_status = 'Withdrawn' 
                WHERE student_id = ?
            `;
            
            const [result] = await connection.execute(stmt, [student_id]);
            return result.affectedRows;
            
        } catch (error) {
            throw new Error(`Error soft deleting student: ${error.message}`);
        }
    },

    /**
     * Hard delete student (admin only)
     */
    delete: async (student_id) => {
        try {
            const stmt = "DELETE FROM students WHERE student_id = ?";
            const [result] = await connection.execute(stmt, [student_id]);
            return result.affectedRows;
            
        } catch (error) {
            throw new Error(`Error deleting student: ${error.message}`);
        }
    },

    /**
     * Generate unique student code
     */
    generateStudentCode: (programCode = 'STU') => {
        const year = new Date().getFullYear().toString().slice(-2);
        const random = Math.floor(1000 + Math.random() * 9000);
        return `${programCode}${year}${random}`;
    },

    /**
     * Update academic metrics
     */
    updateAcademicMetrics: async (student_id) => {
        try {
            const stmt = `
                UPDATE students s
                SET 
                    gpa = (
                        SELECT COALESCE(AVG(total_grade), 0) 
                        FROM student_courses 
                        WHERE student_id = ? AND status = 'Completed'
                    ),
                    cgpa = (
                        SELECT COALESCE(AVG(grade_points), 0) 
                        FROM student_courses 
                        WHERE student_id = ? AND status = 'Completed'
                    ),
                    total_passed_ch = (
                        SELECT COALESCE(SUM(c.credits), 0)
                        FROM student_courses sc
                        JOIN courses c ON sc.course_id = c.course_id
                        WHERE sc.student_id = ? AND sc.status = 'Completed' AND sc.total_grade >= 60
                    )
                WHERE s.student_id = ?
            `;
            
            const [result] = await connection.execute(stmt, [
                student_id, student_id, student_id, student_id
            ]);
            return result.affectedRows;
            
        } catch (error) {
            throw new Error(`Error updating academic metrics: ${error.message}`);
        }
    }
};