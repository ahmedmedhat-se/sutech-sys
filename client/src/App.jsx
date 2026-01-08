import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Import page components
import AcademicPlan from './app/AcademicPlan.jsx';
import StudentAttendance from './app/StudentAttendance.jsx';
import SemesterActivityMarks from './app/SemesterActivityMarks.jsx';
import ExamSchedule from './app/ExamSchedule.jsx';

// Import request components
import CourseWithdrawal from './app/components/CourseWithdrawal.jsx';
import StudentServices from './app/components/StudentServices.jsx';
import DropCourse from './app/components/DropCourse.jsx';
import IncompleteCourse from './app/components/IncompleteCourse.jsx';
import OnlinePayment from './app/components/OnlinePayment.jsx';
import ChangeProgram from './app/components/ChangeProgram.jsx';
import TrackDeclaration from './app/components/TrackDeclaration.jsx';
import Appeal from './app/components/Appeal.jsx';
import RegisterAddDrop from './app/components/RegisterAddDrop.jsx';
import Retake from './app/components/Retake.jsx';

// Import staff components
import AskAdvisor from './app/staff/AskAdvisor.jsx';

// Import reports components
import StudentSchedule from './app/reports/StudentSchedule.jsx';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-light">
        <Navbar expand="lg" className="custom-navbar shadow-sm">
          <Container>
            <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">
              <div className="d-flex align-items-center">
                <div>
                  <img src="./src/assets/SUTtransparent.png" width={'150px'} alt="logo" />
                </div>
              </div>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/" className="nav-link-custom">
                  Academic Plan
                </Nav.Link>
                <Nav.Link as={Link} to="/attendance" className="nav-link-custom">
                  Attendance
                </Nav.Link>
                <Nav.Link as={Link} to="/activity-marks" className="nav-link-custom">
                  Activity Marks
                </Nav.Link>
                <Nav.Link as={Link} to="/exam-schedule" className="nav-link-custom">
                  Exam Schedule
                </Nav.Link>
                
                <NavDropdown title="Requests" id="requests-dropdown" className="nav-dropdown-custom">
                  <div className="dropdown-section-title">Academic Requests</div>
                  <NavDropdown.Item as={Link} to="/requests/register-add-drop">
                    Register / Add / Drop
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/requests/retake">
                    Re-take Request
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/requests/drop-course">
                    Drop Course Request
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/requests/incomplete-course">
                    Incomplete Course Request
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/requests/course-withdrawal">
                    Course Withdrawal Request
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  
                  <div className="dropdown-section-title">Program Requests</div>
                  <NavDropdown.Item as={Link} to="/requests/change-program">
                    Change of Program Request
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/requests/track-declaration">
                    Track Declaration Request
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  
                  <div className="dropdown-section-title">Administrative</div>
                  <NavDropdown.Item as={Link} to="/requests/student-services">
                    Student Services Request
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/requests/appeal">
                    Appeal Request
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/requests/online-payment">
                    Online Payment
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Staff" id="staff-dropdown" className="nav-dropdown-custom">
                  <NavDropdown.Item as={Link} to="/staff/ask-advisor">
                    Ask Advisor
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Reports" id="reports-dropdown" className="nav-dropdown-custom">
                  <NavDropdown.Item as={Link} to="/reports/student-schedule">
                    Student Schedule
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container className="py-4">
          <Routes>
            {/* Main Pages */}
            <Route path="/" element={<AcademicPlan />} />
            <Route path="/attendance" element={<StudentAttendance />} />
            <Route path="/activity-marks" element={<SemesterActivityMarks />} />
            <Route path="/exam-schedule" element={<ExamSchedule />} />
            
            {/* Request Pages */}
            <Route path="/requests/course-withdrawal" element={<CourseWithdrawal />} />
            <Route path="/requests/student-services" element={<StudentServices />} />
            <Route path="/requests/drop-course" element={<DropCourse />} />
            <Route path="/requests/incomplete-course" element={<IncompleteCourse />} />
            <Route path="/requests/online-payment" element={<OnlinePayment />} />
            <Route path="/requests/change-program" element={<ChangeProgram />} />
            <Route path="/requests/track-declaration" element={<TrackDeclaration />} />
            <Route path="/requests/appeal" element={<Appeal />} />
            <Route path="/requests/register-add-drop" element={<RegisterAddDrop />} />
            <Route path="/requests/retake" element={<Retake />} />
            
            {/* Staff Pages */}
            <Route path="/staff/ask-advisor" element={<AskAdvisor />} />
            
            {/* Reports Pages */}
            <Route path="/reports/student-schedule" element={<StudentSchedule />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}