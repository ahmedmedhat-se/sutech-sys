# SUTsis - Project Structure

## Overview
SUTsis is a React-based Student Information System (SIS) for El Sewedy University. The project uses React, React Router, React Bootstrap, and Vite as the build tool.

## Technology Stack
- **React** 19.2.0
- **React Router DOM** 7.11.0
- **React Bootstrap** 2.10.10
- **Bootstrap** 5.3.8
- **Vite** 7.2.4

## Project Structure

```
SUTsis/
│
├── public/
│   └── vite.svg
│
├── src/
│   ├── app/
│   │   └── components/
│   │       ├── AcademicPlan.jsx          # Academic plan page component
│   │       ├── ExamSchedule.jsx          # Exam schedule page component
│   │       ├── SemesterActivityMarks.jsx # Semester activity marks component
│   │       ├── StudentAttendance.jsx     # Student attendance component
│   │       │
│   │       ├── figma/
│   │       │   └── ImageWithFallback.jsx # Image component with fallback
│   │       │
│   │       ├── reports/
│   │       │   └── StudentSchedule.jsx   # Student schedule report
│   │       │
│   │       ├── requests/
│   │       │   ├── Appeal.jsx            # Appeal request component
│   │       │   ├── ChangeProgram.jsx     # Change program request
│   │       │   ├── CourseWithdrawal.jsx  # Course withdrawal request
│   │       │   ├── DropCourse.jsx        # Drop course request
│   │       │   ├── IncompleteCourse.jsx  # Incomplete course request
│   │       │   ├── OnlinePayment.jsx     # Online payment component
│   │       │   ├── RegisterAddDrop.jsx   # Register/Add/Drop request
│   │       │   ├── Retake.jsx            # Retake request
│   │       │   ├── StudentServices.jsx   # Student services request
│   │       │   └── TrackDeclaration.jsx  # Track declaration request
│   │       │
│   │       ├── staff/
│   │       │   └── AskAdvisor.jsx        # Ask advisor component
│   │       │
│   │       └── ui/                       # UI component library (shadcn/ui based)
│   │           ├── accordion.jsx
│   │           ├── alert.jsx
│   │           ├── alert-dialog.jsx
│   │           ├── aspect-ratio.jsx
│   │           ├── avatar.jsx
│   │           ├── badge.jsx
│   │           ├── breadcrumb.jsx
│   │           ├── button.jsx
│   │           ├── calendar.jsx
│   │           ├── card.jsx
│   │           ├── carousel.jsx
│   │           ├── chart.jsx
│   │           ├── checkbox.jsx
│   │           ├── collapsible.jsx
│   │           ├── command.jsx
│   │           ├── context-menu.jsx
│   │           ├── dialog.jsx
│   │           ├── drawer.jsx
│   │           ├── dropdown-menu.jsx
│   │           ├── form.jsx
│   │           ├── hover-card.jsx
│   │           ├── input.jsx
│   │           ├── input-otp.jsx
│   │           ├── label.jsx
│   │           ├── menubar.jsx
│   │           ├── navigation-menu.jsx
│   │           ├── pagination.jsx
│   │           ├── popover.jsx
│   │           ├── progress.jsx
│   │           ├── radio-group.jsx
│   │           ├── resizable.jsx
│   │           ├── scroll-area.jsx
│   │           ├── select.jsx
│   │           ├── separator.jsx
│   │           ├── sheet.jsx
│   │           ├── sidebar.jsx
│   │           ├── skeleton.jsx
│   │           ├── slider.jsx
│   │           ├── sonner.jsx
│   │           ├── switch.jsx
│   │           ├── table.jsx
│   │           ├── tabs.jsx
│   │           ├── textarea.jsx
│   │           ├── toggle.jsx
│   │           ├── toggle-group.jsx
│   │           ├── tooltip.jsx
│   │           ├── use-mobile.ts         # Mobile detection hook
│   │           └── utils.ts              # Utility functions (cn helper)
│   │
│   ├── assets/
│   │   ├── react.svg
│   │   └── SUTtransparent.png
│   │
│   ├── App.jsx                           # Main app component with routing
│   ├── App.css                           # Global app styles
│   ├── main.jsx                          # Application entry point
│   └── index.css                         # Base styles
│
├── index.html                            # HTML template
├── vite.config.js                        # Vite configuration
├── eslint.config.js                      # ESLint configuration
├── package.json                          # Dependencies and scripts
├── package-lock.json                     # Lock file
└── README.md                             # Project documentation

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