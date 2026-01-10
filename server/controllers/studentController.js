import { Student } from "../models/Student.js";

export const studentController = {
    /**
     * Create new student (Registrar only)
     */
    create: async (req, res) => {
        try {
            const studentData = req.body;
            if (!studentData.student_code) {
                studentData.student_code = Student.generateStudentCode();
            }
            
            const studentId = await Student.create(studentData);
            const newStudent = await Student.readById(studentId);
            
            return res.status(201).json({
                message: "Student created successfully",
                success: true,
                student: newStudent
            });
            
        } catch (error) {
            console.error(`Create student error: ${error.message}`);
            
            if (error.message.includes('already exists')) {
                return res.status(409).json({
                    message: error.message,
                    success: false
                });
            }
            
            return res.status(500).json({
                message: "Internal server error",
                success: false
            });
        }
    },

    /**
     * Get all students (Admin, Registrar, Admission)
     */
    getAll: async (req, res) => {
        try {
            const filters = {
                program_id: req.query.program_id,
                enrollment_status: req.query.enrollment_status,
                academic_status: req.query.academic_status,
                current_level: req.query.current_level,
                search: req.query.search
            };
            
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 20;
            
            const result = await Student.readAll(filters, page, limit);
            
            return res.status(200).json({
                message: "Students retrieved successfully",
                success: true,
                data: result.students,
                pagination: result.pagination
            });
            
        } catch (error) {
            console.error(`Get all students error: ${error.message}`);
            return res.status(500).json({
                message: "Internal server error",
                success: false
            });
        }
    },

    /**
     * Get student by ID (Admin, Registrar, Admission, Student - own data)
     */
    getById: async (req, res) => {
        try {
            const { student_id } = req.params;
            if (req.user.role === 'student') {
                const student = await Student.readByUserId(req.user.user_id);
                if (!student || student.student_id != student_id) {
                    return res.status(403).json({
                        message: "Access denied. You can only view your own student data.",
                        success: false
                    });
                }
            }
            
            const student = await Student.readById(student_id);
            
            if (!student) {
                return res.status(404).json({
                    message: "Student not found",
                    success: false
                });
            }
            
            return res.status(200).json({
                message: "Student retrieved successfully",
                success: true,
                student
            });
            
        } catch (error) {
            console.error(`Get student by ID error: ${error.message}`);
            return res.status(500).json({
                message: "Internal server error",
                success: false
            });
        }
    },

    /**
     * Get current student profile (Student role)
     */
    getMyProfile: async (req, res) => {
        try {
            const student = await Student.readByUserId(req.user.user_id);
            
            if (!student) {
                return res.status(404).json({
                    message: "Student profile not found",
                    success: false
                });
            }
            
            return res.status(200).json({
                message: "Student profile retrieved",
                success: true,
                student
            });
            
        } catch (error) {
            console.error(`Get my profile error: ${error.message}`);
            return res.status(500).json({
                message: "Internal server error",
                success: false
            });
        }
    },

    /**
     * Update student (Registrar only)
     */
    update: async (req, res) => {
        try {
            const { student_id } = req.params;
            const updateData = req.body;
            
            const affectedRows = await Student.update(student_id, updateData);
            
            if (affectedRows === 0) {
                return res.status(404).json({
                    message: "Student not found or no changes made",
                    success: false
                });
            }
            
            const updatedStudent = await Student.readById(student_id);
            
            return res.status(200).json({
                message: "Student updated successfully",
                success: true,
                student: updatedStudent
            });
            
        } catch (error) {
            console.error(`Update student error: ${error.message}`);
            return res.status(500).json({
                message: "Internal server error",
                success: false
            });
        }
    },

    /**
     * Delete student (Admin only - hard delete)
     */
    delete: async (req, res) => {
        try {
            const { student_id } = req.params;
            
            const affectedRows = await Student.delete(student_id);
            
            if (affectedRows === 0) {
                return res.status(404).json({
                    message: "Student not found",
                    success: false
                });
            }
            
            return res.status(200).json({
                message: "Student deleted successfully",
                success: true
            });
            
        } catch (error) {
            console.error(`Delete student error: ${error.message}`);
            return res.status(500).json({
                message: "Internal server error",
                success: false
            });
        }
    },

    /**
     * Soft delete student (Registrar - set to Withdrawn)
     */
    withdraw: async (req, res) => {
        try {
            const { student_id } = req.params;
            
            const affectedRows = await Student.softDelete(student_id);
            
            if (affectedRows === 0) {
                return res.status(404).json({
                    message: "Student not found",
                    success: false
                });
            }
            
            return res.status(200).json({
                message: "Student withdrawn successfully",
                success: true
            });
            
        } catch (error) {
            console.error(`Withdraw student error: ${error.message}`);
            return res.status(500).json({
                message: "Internal server error",
                success: false
            });
        }
    },

    /**
     * Get student statistics
     */
    getStatistics: async (req, res) => {
        try {
            if (req.user.role !== 'admin') {
                return res.status(403).json({
                    message: "Access denied. Admin only.",
                    success: false
                });
            }
            
            const stmt = `
                SELECT 
                    COUNT(*) as total_students,
                    COUNT(CASE WHEN enrollment_status = 'Active' THEN 1 END) as active_students,
                    COUNT(CASE WHEN enrollment_status = 'Graduated' THEN 1 END) as graduated_students,
                    COUNT(CASE WHEN academic_status = 'Probation' THEN 1 END) as probation_students,
                    COUNT(CASE WHEN scholarship_type != 'None' THEN 1 END) as scholarship_students,
                    AVG(gpa) as average_gpa
                FROM students
            `;
            
            const [stats] = await connection.execute(stmt);
            
            return res.status(200).json({
                message: "Statistics retrieved",
                success: true,
                statistics: stats[0]
            });
            
        } catch (error) {
            console.error(`Get statistics error: ${error.message}`);
            return res.status(500).json({
                message: "Internal server error",
                success: false
            });
        }
    },

    /**
     * Search students by name or code
     */
    search: async (req, res) => {
        try {
            const { query } = req.query;
            
            if (!query || query.trim().length < 2) {
                return res.status(400).json({
                    message: "Search query must be at least 2 characters",
                    success: false
                });
            }
            
            const stmt = `
                SELECT s.student_id, s.student_code, s.first_name, s.last_name, 
                       s.enrollment_status, p.program_name
                FROM students s
                LEFT JOIN programs p ON s.program_id = p.program_id
                WHERE s.first_name LIKE ? OR s.last_name LIKE ? OR s.student_code LIKE ?
                LIMIT 10
            `;
            
            const searchTerm = `%${query}%`;
            const [results] = await connection.execute(stmt, [
                searchTerm, searchTerm, searchTerm
            ]);
            
            return res.status(200).json({
                message: "Search results",
                success: true,
                results
            });
            
        } catch (error) {
            console.error(`Search error: ${error.message}`);
            return res.status(500).json({
                message: "Internal server error",
                success: false
            });
        }
    }
};