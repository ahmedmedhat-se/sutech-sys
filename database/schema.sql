-- SUTech SYS - Database Schema
-- Version: 1.0
-- Created: 2024

-- Create database
CREATE DATABASE IF NOT EXISTS sutech_sys;
USE sutech_sys;


-- 1. USERS & AUTHENTICATION TABLES
-- Main users table for authentication
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('student', 'teacher', 'admin', 'registrar', 'admission') NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role)
);


-- 2. STUDENT-RELATED TABLES
-- Departments/Faculties table
CREATE TABLE departments (
    department_id INT PRIMARY KEY AUTO_INCREMENT,
    department_code VARCHAR(10) UNIQUE NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    field_of_study VARCHAR(100),
    dean_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_dept_code (department_code)
);

-- Programs table
CREATE TABLE programs (
    program_id INT PRIMARY KEY AUTO_INCREMENT,
    program_code VARCHAR(10) UNIQUE NOT NULL,
    program_name VARCHAR(100) NOT NULL,
    department_id INT,
    total_credits_required INT DEFAULT 120,
    duration_years INT DEFAULT 4,
    degree_type ENUM('Bachelor', 'Master', 'PhD') DEFAULT 'Bachelor',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(department_id),
    INDEX idx_program_code (program_code)
);

-- Main student table
CREATE TABLE students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE,
    student_code VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    date_of_birth DATE,
    gender ENUM('Male', 'Female', 'Other'),
    nationality VARCHAR(50),
    phone_number VARCHAR(20),
    address TEXT,
    
    -- Academic Information
    program_id INT,
    admission_date DATE,
    enrollment_status ENUM('Active', 'Graduated', 'Suspended', 'Withdrawn', 'On Leave') DEFAULT 'Active',
    academic_status ENUM('Good Standing', 'Probation', 'Warning', 'Dismissed') DEFAULT 'Good Standing',
    current_level INT DEFAULT 1,
    gpa DECIMAL(3,2) DEFAULT 0.00,
    cgpa DECIMAL(3,2) DEFAULT 0.00,
    
    -- Credit Information
    total_passed_ch INT DEFAULT 0,
    total_registered_ch INT DEFAULT 0,
    total_remaining_ch INT DEFAULT 0,
    
    -- Scholarship
    scholarship_type ENUM('None', 'Merit-based', 'Need-based', 'Sports', 'Research', 'Full') DEFAULT 'None',
    scholarship_percentage DECIMAL(5,2) DEFAULT 0.00,
    
    -- Emergency Contact
    emergency_contact_name VARCHAR(100),
    emergency_contact_phone VARCHAR(20),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (program_id) REFERENCES programs(program_id),
    INDEX idx_student_code (student_code),
    INDEX idx_program (program_id),
    INDEX idx_enrollment_status (enrollment_status)
);


-- 3. STAFF & TEACHER TABLES
CREATE TABLE teachers (
    teacher_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE,
    teacher_code VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    title ENUM('Prof', 'Dr', 'Mr', 'Mrs', 'Ms') DEFAULT 'Mr',
    specialization VARCHAR(100),
    department_id INT,
    qualification VARCHAR(100),
    joining_date DATE,
    email VARCHAR(255) UNIQUE,
    phone_number VARCHAR(20),
    office_number VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (department_id) REFERENCES departments(department_id),
    INDEX idx_teacher_code (teacher_code)
);

CREATE TABLE administrative_staff (
    staff_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE,
    staff_code VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    position VARCHAR(100),
    department_id INT,
    office_number VARCHAR(20),
    phone_number VARCHAR(20),
    hire_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (department_id) REFERENCES departments(department_id),
    INDEX idx_staff_code (staff_code)
);


-- 4. COURSE & ACADEMIC TABLES
CREATE TABLE courses (
    course_id INT PRIMARY KEY AUTO_INCREMENT,
    course_code VARCHAR(20) UNIQUE NOT NULL,
    course_name VARCHAR(100) NOT NULL,
    course_description TEXT,
    credits INT DEFAULT 3,
    department_id INT,
    prerequisite_course_id INT NULL,
    level INT DEFAULT 1,
    semester ENUM('Fall', 'Spring', 'Summer') DEFAULT 'Fall',
    academic_year YEAR,
    is_active BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (department_id) REFERENCES departments(department_id),
    FOREIGN KEY (prerequisite_course_id) REFERENCES courses(course_id),
    INDEX idx_course_code (course_code)
);

CREATE TABLE sections (
    section_id INT PRIMARY KEY AUTO_INCREMENT,
    section_code VARCHAR(20) UNIQUE NOT NULL,
    course_id INT,
    teacher_id INT,
    schedule VARCHAR(100),
    classroom VARCHAR(50),
    max_capacity INT DEFAULT 30,
    current_enrollment INT DEFAULT 0,
    semester ENUM('Fall', 'Spring', 'Summer') DEFAULT 'Fall',
    academic_year YEAR,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (course_id) REFERENCES courses(course_id),
    FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id),
    INDEX idx_section_code (section_code)
);

CREATE TABLE student_courses (
    enrollment_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    section_id INT,
    enrollment_date DATE,
    status ENUM('Registered', 'Dropped', 'Completed', 'Withdrawn') DEFAULT 'Registered',
    midterm_grade DECIMAL(5,2),
    final_grade DECIMAL(5,2),
    total_grade DECIMAL(5,2),
    grade_letter VARCHAR(2),
    grade_points DECIMAL(3,2),
    attendance_percentage DECIMAL(5,2),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (section_id) REFERENCES sections(section_id),
    UNIQUE KEY unique_student_section (student_id, section_id),
    INDEX idx_student (student_id),
    INDEX idx_section (section_id)
);


-- 5. PAYMENT & FINANCIAL TABLES
CREATE TABLE fees_structure (
    fee_id INT PRIMARY KEY AUTO_INCREMENT,
    program_id INT,
    fee_type ENUM('Tuition', 'Registration', 'Library', 'Lab', 'Other') DEFAULT 'Tuition',
    amount DECIMAL(10,2) NOT NULL,
    academic_year YEAR,
    semester ENUM('Fall', 'Spring', 'Summer') DEFAULT 'Fall',
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (program_id) REFERENCES programs(program_id),
    INDEX idx_fee_program (program_id)
);

CREATE TABLE student_payments (
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    fee_id INT,
    amount_paid DECIMAL(10,2) NOT NULL,
    payment_date DATE,
    payment_method ENUM('Cash', 'Bank Transfer', 'Credit Card', 'Mobile Payment') DEFAULT 'Bank Transfer',
    transaction_id VARCHAR(100) UNIQUE,
    receipt_number VARCHAR(50) UNIQUE,
    academic_year YEAR,
    semester ENUM('Fall', 'Spring', 'Summer') DEFAULT 'Fall',
    status ENUM('Pending', 'Completed', 'Failed', 'Refunded') DEFAULT 'Completed',
    notes TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (fee_id) REFERENCES fees_structure(fee_id),
    INDEX idx_student_payment (student_id),
    INDEX idx_payment_date (payment_date)
);

CREATE TABLE invoices (
    invoice_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    total_amount DECIMAL(10,2) NOT NULL,
    amount_due DECIMAL(10,2) NOT NULL,
    issue_date DATE,
    due_date DATE,
    status ENUM('Pending', 'Paid', 'Overdue', 'Cancelled') DEFAULT 'Pending',
    academic_year YEAR,
    semester ENUM('Fall', 'Spring', 'Summer') DEFAULT 'Fall',
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    INDEX idx_invoice_student (student_id),
    INDEX idx_invoice_status (status)
);


-- 6. REQUESTS & SERVICES TABLES
CREATE TABLE student_requests (
    request_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    request_type ENUM(
        'Add Course',
        'Drop Course',
        'Retake Course',
        'Withdrawal',
        'Track Change',
        'Program Change',
        'Appeal',
        'Other'
    ) NOT NULL,
    request_details TEXT,
    status ENUM('Pending', 'Approved', 'Rejected', 'In Progress') DEFAULT 'Pending',
    submitted_date DATE,
    processed_date DATE NULL,
    processed_by INT NULL,
    response_notes TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (processed_by) REFERENCES users(user_id),
    INDEX idx_request_student (student_id),
    INDEX idx_request_status (status)
);

CREATE TABLE attendance (
    attendance_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    section_id INT,
    attendance_date DATE,
    status ENUM('Present', 'Absent', 'Late', 'Excused') DEFAULT 'Present',
    recorded_by INT,
    notes TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (section_id) REFERENCES sections(section_id),
    FOREIGN KEY (recorded_by) REFERENCES users(user_id),
    UNIQUE KEY unique_attendance (student_id, section_id, attendance_date),
    INDEX idx_attendance_date (attendance_date)
);


-- 7. INSERTS FOR INITIAL DATA
-- Insert Departments (Fields)
INSERT INTO departments (department_code, department_name, field_of_study) VALUES
('EE', 'Electrical Engineering', 'Field Of Electrical Engineering Technology'),
('AI', 'Artificial Intelligence', 'Field of Artificial Intelligence & Computer Engineering Technology'),
('CS', 'Computer Science', 'Field of Artificial Intelligence & Computer Engineering Technology'),
('CYBER', 'Cyber Security', 'Field of Artificial Intelligence & Computer Engineering Technology'),
('IT', 'Information Technology', 'Field of Artificial Intelligence & Computer Engineering Technology'),
('ANIM', 'Animation & Visual Design', 'Field of Art and Design Technology'),
('PROD', 'Product Design', 'Field of Art and Design Technology');

-- Insert Programs
INSERT INTO programs (program_code, program_name, department_id, degree_type) VALUES
-- Electrical Engineering Programs
('EE-POWER', 'Power Engineering Technology', 1, 'Bachelor'),
('EE-ELECT', 'Electronic Engineering Technology', 1, 'Bachelor'),
('EE-ENERGY', 'Energy Engineering Technology', 1, 'Bachelor'),

-- AI & Computer Engineering Programs
('AI-DS', 'AI & Data Science Technology', 2, 'Bachelor'),
('CS-BSC', 'Computer Science Technology', 3, 'Bachelor'),
('CYBER-BSC', 'Networking and Cyber Security Technology', 4, 'Bachelor'),
('IT-BSC', 'IT Technology', 5, 'Bachelor'),

-- Art and Design Programs
('ANIM-BSC', 'Animation & Visual Design Technology', 6, 'Bachelor'),
('PROD-BSC', 'Product Design Technology', 7, 'Bachelor');

-- Insert Sample Students
INSERT INTO students (
    user_id, student_code, first_name, last_name, program_id,
    admission_date, enrollment_status, academic_status, current_level,
    gpa, cgpa, total_passed_ch, total_registered_ch,
    scholarship_type, scholarship_percentage
) VALUES
(2, 'SUT2024001', 'Mohamed', 'Ali', 1, '2024-09-01', 'Active', 'Good Standing', 1, 3.5, 3.5, 15, 18, 'Merit-based', 25.00),
(3, 'SUT2024002', 'Sarah', 'Mostafa', 4, '2024-09-01', 'Active', 'Good Standing', 1, 3.2, 3.2, 12, 15, 'None', 0.00),
(4, 'SUT2024003', 'Omar', 'Hassan', 8, '2024-09-01', 'Active', 'Probation', 1, 1.8, 1.8, 9, 12, 'Need-based', 50.00);

-- Insert Sample Teachers
INSERT INTO teachers (user_id, teacher_code, first_name, last_name, title, department_id, specialization) VALUES
(5, 'TEC001', 'Ahmed', 'Mahmoud', 'Prof', 1, 'Power Systems'),
(6, 'TEC002', 'Mona', 'Samir', 'Dr', 4, 'Cyber Security');

-- Insert Sample Administrative Staff
SELECT user_id, email, role FROM users ORDER BY user_id;

INSERT INTO administrative_staff (user_id, staff_code, first_name, last_name, position, department_id) VALUES
(NULL, 'REG001', 'Youssef', 'Kamal', 'Registrar', NULL),
(NULL, 'ADM001', 'Nadia', 'Fawzy', 'Admission Officer', NULL);

-- Insert Sample Courses
INSERT INTO courses (course_code, course_name, credits, department_id, level) VALUES
('EE101', 'Circuit Analysis', 3, 1, 1),
('EE102', 'Digital Electronics', 3, 1, 1),

('AI101', 'Introduction to AI', 3, 2, 1),
('AI102', 'Machine Learning Fundamentals', 3, 2, 1),

('CS101', 'Programming Fundamentals', 3, 3, 1),
('CS102', 'Data Structures', 3, 3, 2),

('CY101', 'Network Security', 3, 4, 2),
('CY102', 'Ethical Hacking', 3, 4, 3),

('AN101', 'Digital Drawing', 3, 6, 1),
('AN102', '3D Modeling', 3, 6, 2),

('PD101', 'Design Principles', 3, 7, 1),
('PD102', 'Product Prototyping', 3, 7, 2);

INSERT INTO fees_structure (program_id, fee_type, amount, academic_year) VALUES
(1, 'Tuition', 15000.00, 2024),
(4, 'Tuition', 18000.00, 2024),
(8, 'Tuition', 12000.00, 2024),
(1, 'Registration', 1000.00, 2024),
(4, 'Registration', 1000.00, 2024),
(8, 'Registration', 1000.00, 2024);

CREATE VIEW student_academic_summary AS
SELECT 
    s.student_id,
    s.student_code,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    p.program_name,
    d.department_name,
    s.current_level,
    s.enrollment_status,
    s.academic_status,
    s.gpa,
    s.cgpa,
    s.total_passed_ch,
    s.total_registered_ch,
    s.scholarship_type,
    s.scholarship_percentage
FROM students s
JOIN programs p ON s.program_id = p.program_id
JOIN departments d ON p.department_id = d.department_id;

CREATE VIEW teacher_courses_view AS
SELECT 
    t.teacher_id,
    t.teacher_code,
    CONCAT(t.first_name, ' ', t.last_name) AS teacher_name,
    t.title,
    d.department_name,
    c.course_code,
    c.course_name,
    c.credits,
    s.section_code,
    s.schedule,
    s.classroom
FROM teachers t
LEFT JOIN sections s ON t.teacher_id = s.teacher_id
LEFT JOIN courses c ON s.course_id = c.course_id
LEFT JOIN departments d ON t.department_id = d.department_id;

DELIMITER //
CREATE PROCEDURE CalculateStudentGPA(IN studentID INT)
BEGIN
    DECLARE totalPoints DECIMAL(10,2);
    DECLARE totalCredits INT;
    DECLARE calculatedGPA DECIMAL(3,2);
    
    SELECT 
        SUM(sc.grade_points * c.credits),
        SUM(c.credits)
    INTO totalPoints, totalCredits
    FROM student_courses sc
    JOIN sections sec ON sc.section_id = sec.section_id
    JOIN courses c ON sec.course_id = c.course_id
    WHERE sc.student_id = studentID 
    AND sc.status = 'Completed'
    AND sc.grade_points IS NOT NULL;
    
    IF totalCredits > 0 THEN
        SET calculatedGPA = totalPoints / totalCredits;
    ELSE
        SET calculatedGPA = 0.00;
    END IF;
    
    UPDATE students 
    SET gpa = ROUND(calculatedGPA, 2)
    WHERE student_id = studentID;
    
    SELECT calculatedGPA AS calculated_gpa;
END //

CREATE PROCEDURE EnrollStudentInCourse(
    IN studentID INT,
    IN sectionID INT
)
BEGIN
    DECLARE currentEnroll INT;
    DECLARE maxCap INT;
    SELECT current_enrollment, max_capacity 
    INTO currentEnroll, maxCap 
    FROM sections 
    WHERE section_id = sectionID;
    
    IF currentEnroll >= maxCap THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Section is at full capacity';
    ELSEIF EXISTS (
        SELECT 1 FROM student_courses 
        WHERE student_id = studentID 
        AND section_id = sectionID 
        AND status = 'Registered'
    ) THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Student already enrolled in this section';
    ELSE
        INSERT INTO student_courses (student_id, section_id, enrollment_date, status)
        VALUES (studentID, sectionID, CURDATE(), 'Registered');
        UPDATE sections 
        SET current_enrollment = current_enrollment + 1 
        WHERE section_id = sectionID;
        UPDATE students s
        JOIN sections sec ON sec.section_id = sectionID
        JOIN courses c ON sec.course_id = c.course_id
        SET s.total_registered_ch = s.total_registered_ch + c.credits
        WHERE s.student_id = studentID;
    END IF;
END //

DELIMITER ;

DELIMITER //

CREATE TRIGGER after_course_completion
AFTER UPDATE ON student_courses
FOR EACH ROW
BEGIN
    IF NEW.status = 'Completed' AND OLD.status != 'Completed' THEN
        UPDATE students s
        JOIN sections sec ON sec.section_id = NEW.section_id
        JOIN courses c ON sec.course_id = c.course_id
        SET s.total_passed_ch = s.total_passed_ch + c.credits,
            s.total_remaining_ch = s.total_remaining_ch - c.credits
        WHERE s.student_id = NEW.student_id;
    END IF;
END //

CREATE TRIGGER after_student_insert
AFTER INSERT ON students
FOR EACH ROW
BEGIN
    INSERT INTO users (email, password_hash, role)
    VALUES (
        CONCAT(NEW.student_code, '@sutech.edu'),
        '$2b$10$temporarypasswordhash',
        'student'
    );
END //

DELIMITER ;

CREATE INDEX idx_student_name ON students(first_name, last_name);
CREATE INDEX idx_student_program ON students(program_id, enrollment_status);
CREATE INDEX idx_course_department ON courses(department_id, level);
CREATE INDEX idx_payment_student_year ON student_payments(student_id, academic_year, semester);
CREATE INDEX idx_attendance_student_section ON attendance(student_id, section_id, attendance_date);
CREATE INDEX idx_request_type_status ON student_requests(request_type, status);

ALTER TABLE users COMMENT = 'Main authentication table for all system users';
ALTER TABLE students COMMENT = 'Student academic and personal information';
ALTER TABLE teachers COMMENT = 'Faculty member information';
ALTER TABLE courses COMMENT = 'Course catalog and information';
ALTER TABLE student_courses COMMENT = 'Student course enrollment and grades';
ALTER TABLE student_payments COMMENT = 'Student financial transactions';


SELECT 
    TABLE_NAME,
    TABLE_ROWS as 'Estimated Rows',
    DATA_LENGTH as 'Data Size (bytes)',
    INDEX_LENGTH as 'Index Size (bytes)',
    CREATE_TIME
FROM information_schema.TABLES 
WHERE TABLE_SCHEMA = 'sutech_sys'
ORDER BY CREATE_TIME;

-- Change the column name in database
-- ALTER TABLE users 
-- CHANGE COLUMN password_hash password VARCHAR(255) NOT NULL;