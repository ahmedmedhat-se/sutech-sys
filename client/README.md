# SUTech SYS – SUTech Student Information System (Client-Side)

> University Student Information System Simulation Platform

<div align="center">
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQlEOY0biqajZfvAxV3einGVGYMk9dUR0FCA&s" alt="sutech Logo" width="250" />
</div>

---
## 🎓 Project Overview
**SUTech SYS** is a full-stack **Student Information System (SIS)** developed for **SUTech University**.  
The platform provides students, staff, and administrators with a centralized system to manage **academic data**, **attendance**, **exam schedules**, **requests**, and **student services** through a secure and scalable SaaS architecture.

The system is designed to modernize university workflows, reduce paperwork, and improve transparency between students and academic staff.

**University:** ElSewedy University of Technology --POLYTECHNIC Egypt--
**Project Type:** Client Side (ReactJS + Bootstrap) 
**License:** Educational/Business Use Only  

## 🛠 Tech Stack & Tools
| Tool/Tech       | Purpose                 | Logo                                                                                                       |
| --------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Node.js**     | Backend runtime         | ![Node.js](https://img.icons8.com/color/48/000000/nodejs.png)                                              |
| **React.js**    | Frontend framework      | ![React](https://img.icons8.com/color/48/react-native.png)                                                 |
| **React Router**    | Routing      | ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)                                                 |
| **React Bootstrap**    | UI Framework      | ![React Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)                                                 |
| **Bootstrap v5** | UI Styling              | ![Bootstrap](https://img.icons8.com/color/48/bootstrap.png)                                                |
| **Figma**       | UI/UX Design            | ![Figma](https://img.icons8.com/color/48/figma--v1.png)                                                    |
| **Vite**       | Vite            | ![Vite](https://img.icons8.com/color/48/vite.png)                                                    |

---
## 👥 Team 
- **Steven Gerges** – Frontend Developer  

## 🏗️ Project Structure
```
client/
│
├── public/
│   └── sutech_logo.png
│
├── src/
│   ├── app/
│   │   ├── AcademicPlan.jsx
│   │   ├── ExamSchedule.jsx
│   │   ├── SemesterActivityMarks.jsx
│   │   ├── StudentAttendance.jsx
│   │   │
│   │   ├── figma/
│   │   │   └── ImageWithFallback.jsx
│   │   │
│   │   ├── reports/
│   │   │   └── StudentSchedule.jsx
│   │   │
│   │   ├── components/
│   │   │   ├── Appeal.jsx
│   │   │   ├── ChangeProgram.jsx
│   │   │   ├── CourseWithdrawal.jsx
│   │   │   ├── DropCourse.jsx
│   │   │   ├── IncompleteCourse.jsx
│   │   │   ├── OnlinePayment.jsx
│   │   │   ├── RegisterAddDrop.jsx
│   │   │   ├── Retake.jsx
│   │   │   ├── StudentServices.jsx
│   │   │   └── TrackDeclaration.jsx
│   │   │
│   │   ├── staff/
│   │   │   └── AskAdvisor.jsx
│   │   │
│   │   └── ui/
│   │       ├── accordion.jsx
│   │       ├── alert.jsx
│   │       ├── alert-dialog.jsx
│   │       ├── aspect-ratio.jsx
│   │       ├── avatar.jsx
│   │       ├── badge.jsx
│   │       ├── breadcrumb.jsx
│   │       ├── button.jsx
│   │       ├── calendar.jsx
│   │       ├── card.jsx
│   │       ├── carousel.jsx
│   │       ├── chart.jsx
│   │       ├── checkbox.jsx
│   │       ├── collapsible.jsx
│   │       ├── command.jsx
│   │       ├── context-menu.jsx
│   │       ├── dialog.jsx
│   │       ├── drawer.jsx
│   │       ├── dropdown-menu.jsx
│   │       ├── form.jsx
│   │       ├── hover-card.jsx
│   │       ├── input.jsx
│   │       ├── input-otp.jsx
│   │       ├── label.jsx
│   │       ├── menubar.jsx
│   │       ├── navigation-menu.jsx
│   │       ├── pagination.jsx
│   │       ├── popover.jsx
│   │       ├── progress.jsx
│   │       ├── radio-group.jsx
│   │       ├── resizable.jsx
│   │       ├── scroll-area.jsx
│   │       ├── select.jsx
│   │       ├── separator.jsx
│   │       ├── sheet.jsx
│   │       ├── sidebar.jsx
│   │       ├── skeleton.jsx
│   │       ├── slider.jsx
│   │       ├── sonner.jsx
│   │       ├── switch.jsx
│   │       ├── table.jsx
│   │       ├── tabs.jsx
│   │       ├── textarea.jsx
│   │       ├── toggle.jsx
│   │       ├── toggle-group.jsx
│   │       ├── tooltip.jsx
│   │       ├── use-mobile.ts
│   │       └── utils.ts
│   │
│   ├── assets/
│   │   └── SUTtransparent.png
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
│
├── index.html
├── vite.config.js
├── eslint.config.js
├── package.json
├── package-lock.json
└── README.md
```

## Component Organization

### Main Pages
- **AcademicPlan.jsx** - Displays student academic plan, GPA, credits, and course history
- **StudentAttendance.jsx** - Student attendance tracking
- **SemesterActivityMarks.jsx** - Semester activity marks display
- **ExamSchedule.jsx** - Exam schedule information

### Request Components (`/requests/`)
All request-related components for various student services:
- Academic Requests: Register/Add/Drop, Retake, Drop Course, Incomplete Course, Course Withdrawal
- Program Requests: Change Program, Track Declaration
- Administrative: Student Services, Appeal, Online Payment

### Staff Components (`/staff/`)
- **AskAdvisor.jsx** - Advisor communication component

### Reports Components (`/reports/`)
- **StudentSchedule.jsx** - Student schedule report generation

### UI Components (`/ui/`)
Comprehensive UI component library based on shadcn/ui and Radix UI primitives. All components are in JSX format (converted from TypeScript).

## Routing Structure

The application uses React Router with the following routes:

- `/` - Academic Plan
- `/attendance` - Student Attendance
- `/activity-marks` - Semester Activity Marks
- `/exam-schedule` - Exam Schedule
- `/requests/*` - Various request pages
- `/staff/*` - Staff-related pages
- `/reports/*` - Report pages

## Styling

- **App.css** - Contains custom styles, color variables, and component-specific styling
- **Bootstrap** - Used for layout and base components
- **Custom CSS Variables**:
  - `--primary-color`: #cf644b
  - `--secondary-color`: #257988
  - `--tertiary-color`: #58286e

## Build & Development

- **Development**: `npm run dev`
- **Build**: `npm run build`
- **Preview**: `npm run preview`
- **Lint**: `npm run lint`

## Notes

- All UI components in the `ui/` folder have been converted from `.tsx` to `.jsx`
- The project uses functional components with React Hooks
- Bootstrap is used for responsive layout and base styling
- Custom styling is applied through App.css with a consistent color scheme