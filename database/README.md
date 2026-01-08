# SUTech SYS – Student Information System Database Schema

> MySQL Database Schema for University Management System  
> Developed by **Ahmed Medhat**

<div align="center">
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQlEOY0biqajZfvAxV3einGVGYMk9dUR0FCA&s" alt="SUTech Logo" width="250" />
</div>

---

## 📋 Database Overview
The **SUTech SYS Database** is a comprehensive *MySQL relational database* designed to power a full-featured **Student Information System (SIS)** for **SUTech University**. This database schema supports all academic, administrative, and financial operations of a modern university.

**Database Name:** `sutech_sys`  
**Engine:** InnoDB  
**Charset:** utf8mb4  
**Collation:** utf8mb4_unicode_ci  
**Total Tables:** 18  
**Total Views:** 2  
**Stored Procedures:** 2  
**Triggers:** 2  

**University:** ElSewedy University of Technology --POLYTECHNIC Egypt--  
**Developed by:** Ahmed Medhat  
**Project Type:** University Management System Database  
**License:** Educational/Business Use Only  

---

## 🏗️ Database Architecture

### Core Structure
The database follows a **modular design** with these main components:

```
┌─────────────────┐       ┌─────────────────┐       ┌────────────────┐
│      users      │       │   departments   │       │    programs    │
├─────────────────┤       ├─────────────────┤       ├────────────────┤
│ user_id (PK)    │◄──────│ department_id(PK)│◄─────│ program_id (PK)│
│ email           │       │ dept_code       │       │ program_code   │
│ password_hash   │       │ dept_name       │       │ program_name   │
│ role            │       │ field_of_study  │       │ total_credits  │
│ is_active       │       │ dean_name       │       │ degree_type    │
│ last_login      │       └─────────────────┘       └────────────────┘
└─────────────────┘               │                          ▲
       │                          │                          │
       ├──────────────────────────┼──────────────────────────┘
       │                          │
       ▼                          ▼
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│    students     │       │    teachers     │       │      courses    │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ student_id (PK) │       │ teacher_id (PK) │       │ course_id (PK)  │
│ user_id (FK)    │       │ user_id (FK)    │       │ course_code     │
│ student_code    │       │ teacher_code    │       │ course_name     │
│ first_name      │       │ first_name      │       │ credits         │
│ last_name       │       │ last_name       │       │ department_id(FK)│
│ program_id (FK) │       │ department_id(FK)│      │ prerequisite_id │
│ enrollment_status│      │ specialization  │       │ level           │
│ academic_status │       │ title           │       │ semester        │
│ current_level   │       │ office_number   │       │ academic_year   │
│ gpa/cgpa        │       └─────────────────┘       └─────────────────┘
│ total_passed_ch │               │                         ▲
│ total_reg_ch    │               │                         │
│ scholarship     │               ▼                         │
└─────────────────┘       ┌─────────────────┐               │
       │                  │    sections     │               │
       │                  ├─────────────────┤               │
       │                  │ section_id (PK) │◄──────────────┘
       │                  │ section_code    │
       │                  │ course_id (FK)  │
       │                  │ teacher_id (FK) │
       │                  │ schedule        │
       │                  │ classroom       │
       │                  │ max_capacity    │
       └────────────────► current_enrollment│
                          └─────────────────┘
                                  │
                                  ▼
                          ┌─────────────────┐       ┌─────────────────┐
                          │student_courses  │       │   attendance    │
                          ├─────────────────┤       ├─────────────────┤
                          │enrollment_id(PK)│       │attendance_id(PK)│
                          │student_id (FK)  │       │student_id (FK)  │
                          │section_id (FK)  │       │section_id (FK)  │
                          │status           │       │attendance_date  │
                          │midterm_grade    │       │status           │
                          │final_grade      │       │recorded_by (FK) │
                          │total_grade      │       │notes            │
                          │grade_letter     │       └─────────────────┘
                          │grade_points     │
                          │attendance_%     │
                          └─────────────────┘
                                  │
                                  ▼
                          ┌─────────────────┐       ┌─────────────────┐
                          │ student_payments│       │   invoices      │
                          ├─────────────────┤       ├─────────────────┤
                          │payment_id (PK)  │       │invoice_id (PK)  │
                          │student_id (FK)  │       │student_id (FK)  │
                          │fee_id (FK)      │       │total_amount     │
                          │amount_paid      │       │amount_due       │
                          │payment_date     │       │issue_date       │
                          │payment_method   │       │due_date         │
                          │transaction_id   │       │status           │
                          │receipt_number   │       │academic_year    │
                          │status           │       │semester         │
                          │notes            │       └─────────────────┘
                          └─────────────────┘
                                  ▲
                                  │
                          ┌─────────────────┐
                          │  fees_structure │
                          ├─────────────────┤
                          │fee_id (PK)      │
                          │program_id (FK)  │
                          │fee_type         │
                          │amount           │
                          │academic_year    │
                          │semester         │
                          └─────────────────┘
```

---
## 🗂️ Table Specifications
### 👥 **users** – Authentication & Authorization
```sql
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('student', 'teacher', 'admin', 'registrar', 'admission') NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```
**Purpose:** Central authentication table for all system users. Every person in the system has one user account.
**Indexes:** idx_email, idx_role
**Relationships:** Linked to students, teachers, administrative_staff via user_id.

---
### 🎓 **students** – Student Academic Records
```sql
CREATE TABLE students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE,
    student_code VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    date_of_birth DATE,
    gender ENUM('Male', 'Female', 'Other'),
    
    -- Academic Information
    program_id INT,
    admission_date DATE,
    enrollment_status ENUM('Active', 'Graduated', 'Suspended', 'Withdrawn', 'On Leave'),
    academic_status ENUM('Good Standing', 'Probation', 'Warning', 'Dismissed'),
    current_level INT DEFAULT 1,
    gpa DECIMAL(3,2) DEFAULT 0.00,
    cgpa DECIMAL(3,2) DEFAULT 0.00,
    
    -- Credit Tracking
    total_passed_ch INT DEFAULT 0,
    total_registered_ch INT DEFAULT 0,
    total_remaining_ch INT DEFAULT 0,
    
    -- Scholarship
    scholarship_type ENUM('None', 'Merit-based', 'Need-based', 'Sports', 'Research', 'Full'),
    scholarship_percentage DECIMAL(5,2) DEFAULT 0.00
);
```
**Purpose:** Stores all student academic and personal information.
**Indexes:** idx_student_code, idx_program, idx_enrollment_status
**Foreign Keys:** user_id → users.user_id, program_id → programs.program_id
**Key Features:** Tracks GPA, credits, scholarship, and academic status.

---
### 👨‍🏫 **teachers** – Faculty Members
```sql
CREATE TABLE teachers (
    teacher_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE,
    teacher_code VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    title ENUM('Prof', 'Dr', 'Mr', 'Mrs', 'Ms'),
    specialization VARCHAR(100),
    department_id INT,
    qualification VARCHAR(100),
    office_number VARCHAR(20)
);
```
**Purpose:** Stores faculty member information and qualifications.
**Indexes:** idx_teacher_code
**Relationships:** Teaches sections, belongs to departments.

---
### 🏛️ **departments** – Academic Departments
```sql
CREATE TABLE departments (
    department_id INT PRIMARY KEY AUTO_INCREMENT,
    department_code VARCHAR(10) UNIQUE NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    field_of_study VARCHAR(100)
);
```
**Purpose:** Represents university departments/faculties.
**Pre-loaded Data:** Includes all 7 fields of study at SUTech University.

---
### 📚 **programs** – Academic Programs
```sql
CREATE TABLE programs (
    program_id INT PRIMARY KEY AUTO_INCREMENT,
    program_code VARCHAR(10) UNIQUE NOT NULL,
    program_name VARCHAR(100) NOT NULL,
    department_id INT,
    total_credits_required INT DEFAULT 120,
    duration_years INT DEFAULT 4,
    degree_type ENUM('Bachelor', 'Master', 'PhD') DEFAULT 'Bachelor'
);
```
**Purpose:** Defines academic programs within departments.
**Pre-loaded Data:** Includes 9 programs across 7 departments.

---
### 📖 **courses** – Course Catalog
```sql
CREATE TABLE courses (
    course_id INT PRIMARY KEY AUTO_INCREMENT,
    course_code VARCHAR(20) UNIQUE NOT NULL,
    course_name VARCHAR(100) NOT NULL,
    course_description TEXT,
    credits INT DEFAULT 3,
    department_id INT,
    prerequisite_course_id INT NULL,
    level INT DEFAULT 1,
    semester ENUM('Fall', 'Spring', 'Summer') DEFAULT 'Fall'
);
```
**Purpose:** Course catalog with prerequisites and credit information.
**Self-Referencing:** prerequisite_course_id points to another course in same table

---
### 🏫 **sections** – Course Offerings
```sql
CREATE TABLE sections (
    section_id INT PRIMARY KEY AUTO_INCREMENT,
    section_code VARCHAR(20) UNIQUE NOT NULL,
    course_id INT,
    teacher_id INT,
    schedule VARCHAR(100),
    classroom VARCHAR(50),
    max_capacity INT DEFAULT 30,
    current_enrollment INT DEFAULT 0
);
```
**Purpose:** Specific instances of courses offered in a semester.
**Relationships:** Links courses with teachers and students.

---
### 📝 **student_courses** – Enrollment & Grades
```sql
CREATE TABLE student_courses (
    enrollment_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    section_id INT,
    enrollment_date DATE,
    status ENUM('Registered', 'Dropped', 'Completed', 'Withdrawn'),
    midterm_grade DECIMAL(5,2),
    final_grade DECIMAL(5,2),
    total_grade DECIMAL(5,2),
    grade_letter VARCHAR(2),
    grade_points DECIMAL(3,2),
    attendance_percentage DECIMAL(5,2)
);
```
**Purpose:** Tracks student enrollment, grades, and attendance in courses.
**Unique Constraint:** Prevents duplicate enrollment in same section.

---
### 💰 **Financial** Tables
*fees_structure – Fee Definitions*
```sql
CREATE TABLE fees_structure (
    fee_id INT PRIMARY KEY AUTO_INCREMENT,
    program_id INT,
    fee_type ENUM('Tuition', 'Registration', 'Library', 'Lab', 'Other'),
    amount DECIMAL(10,2) NOT NULL,
    academic_year YEAR
);
```

*student_payments – Payment Transactions*
```sql
CREATE TABLE student_payments (
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    fee_id INT,
    amount_paid DECIMAL(10,2) NOT NULL,
    payment_date DATE,
    payment_method ENUM('Cash', 'Bank Transfer', 'Credit Card', 'Mobile Payment'),
    transaction_id VARCHAR(100) UNIQUE,
    receipt_number VARCHAR(50) UNIQUE,
    status ENUM('Pending', 'Completed', 'Failed', 'Refunded')
);
```

*invoices – Student Invoices*
```sql
CREATE TABLE invoices (
    invoice_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    total_amount DECIMAL(10,2) NOT NULL,
    amount_due DECIMAL(10,2) NOT NULL,
    issue_date DATE,
    due_date DATE,
    status ENUM('Pending', 'Paid', 'Overdue', 'Cancelled')
);
```

---
### 📋 **student_requests** – Service Requests
```sql
CREATE TABLE student_requests (
    request_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    request_type ENUM('Add Course', 'Drop Course', 'Retake Course', 'Withdrawal', 'Track Change', 'Program Change', 'Appeal', 'Other'),
    request_details TEXT,
    status ENUM('Pending', 'Approved', 'Rejected', 'In Progress'),
    submitted_date DATE,
    processed_date DATE NULL,
    processed_by INT NULL
);
```
**Purpose:** Manages all student service requests and workflows

---
### ✅ **attendance** – Class Attendance
```sql
CREATE TABLE attendance (
    attendance_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    section_id INT,
    attendance_date DATE,
    status ENUM('Present', 'Absent', 'Late', 'Excused'),
    recorded_by INT,
    notes TEXT
);
```
**Purpose:** Tracks student attendance in class sessions

---
## 📈 Performance Optimizations
### Indexes Applied:
1) Primary keys on all tables
2) Foreign key indexes
3) Composite indexes for common queries
4) Unique constraints on business keys

### Optimization Strategies:
1) Views for complex joins
2) Stored procedures for frequent operations
3) Triggers for data integrity
4) Proper data types and lengths

---
## 🔒 Security Considerations
### Database Level:
1) Password hashing (application responsibility)
2) Role-based permissions
3) Input validation via constraints
4) Audit trails via timestamps

### Application Level (to implement):
1) JWT token authentication
2) API rate limiting
3) SQL injection prevention
4) HTTPS enforcement

---
## 📝 Best Practices Followed
1) **Naming Conventions:** Consistent snake_case, descriptive names
2) **Data Types:** Appropriate sizes, ENUM for fixed values
3) **Foreign Keys:** All relationships properly defined
4) **Indexing:** Strategic indexes for performance
5) **Normalization:** 3NF compliance
6) **Documentation:** Comprehensive comments
7) **Backup:** Regular backup strategy recommended

---
🔮 Future Enhancements
1) **Audit Logging:** Track all changes to sensitive data
2) **Reporting Module:** Advanced analytics and reports
3) **Notification System:** Email/SMS integration
4) **Mobile API:** RESTful endpoints for mobile apps
5) **Data Archiving:** Historical data management
6) **Multi-tenancy:** Support for multiple campuses

---
## 🤝 Team Collaboration
### For Developers:
1) Use the provided views for common queries
2) Follow the stored procedures for complex operations
3) Maintain referential integrity
4) Test with sample data before production

### For Database Administrators:
1) Monitor performance with EXPLAIN queries
2) Regular backup schedule
3) Index optimization based on query patterns
4) Security audits

---
## 📄 License & Usage
**PROPRIETARY LICENSE**
© 2025 Ahmed Medhat. All Rights Reserved.
This database schema is designed for *SUTech University Student Information System*. It is intended for educational and business use within the university. Commercial redistribution or modification for other institutions requires written permission.

**Disclaimer:** This is a conceptual database design. Production implementation requires additional security measures, backup strategies, and compliance with data protection regulations.

### 👤 AuthorFull Stack Developer

---
**Last Updated:** January 2025
**Version:** 1.0
**Status:** Development