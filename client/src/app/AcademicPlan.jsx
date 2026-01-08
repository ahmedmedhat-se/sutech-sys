import { Card, Table, ProgressBar, Row, Col } from 'react-bootstrap';

export default function AcademicPlan() {
  const semesters = [
    {
      name: 'Fall 2023',
      courses: [
        { code: 'CS101', name: 'Introduction to Computer Science', credits: 3, grade: 'A', gpa: 4.0 },
        { code: 'MATH201', name: 'Calculus I', credits: 4, grade: 'A-', gpa: 3.7 },
        { code: 'ENG101', name: 'English Communication', credits: 3, grade: 'B+', gpa: 3.3 },
        { code: 'PHY101', name: 'Physics I', credits: 4, grade: 'B', gpa: 3.0 },
      ],
    },
    {
      name: 'Spring 2024',
      courses: [
        { code: 'CS202', name: 'Data Structures', credits: 3, grade: 'A', gpa: 4.0 },
        { code: 'MATH202', name: 'Calculus II', credits: 4, grade: 'B+', gpa: 3.3 },
        { code: 'CS205', name: 'Digital Logic Design', credits: 3, grade: 'A-', gpa: 3.7 },
        { code: 'HUM101', name: 'Introduction to Philosophy', credits: 2, grade: 'A', gpa: 4.0 },
      ],
    },
    {
      name: 'Fall 2024 (Current)',
      courses: [
        { code: 'CS301', name: 'Algorithms', credits: 3, grade: 'In Progress', gpa: null },
        { code: 'CS303', name: 'Database Systems', credits: 3, grade: 'In Progress', gpa: null },
        { code: 'CS305', name: 'Computer Networks', credits: 3, grade: 'In Progress', gpa: null },
        { code: 'STAT201', name: 'Probability & Statistics', credits: 3, grade: 'In Progress', gpa: null },
      ],
    },
  ];

  const totalCredits = 126;
  const completedCredits = 40;
  const currentCGPA = 3.56;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">My Academic Plan</h1>
        <p className="page-subtitle">View your complete academic journey and track your progress</p>
      </div>

      <Row className="mb-4">
        <Col md={4}>
          <div className="stat-card stat-primary">
            <div className="stat-label">Cumulative GPA</div>
            <div className="stat-value">{currentCGPA}</div>
          </div>
        </Col>
        <Col md={4}>
          <div className="stat-card stat-secondary">
            <div className="stat-label">Completed Credits</div>
            <div className="stat-value">{completedCredits}/{totalCredits}</div>
          </div>
        </Col>
        <Col md={4}>
          <div className="stat-card stat-tertiary">
            <div className="stat-label">Progress</div>
            <div className="stat-value">{Math.round((completedCredits / totalCredits) * 100)}%</div>
          </div>
        </Col>
      </Row>

      <Card className="custom-card mb-4">
        <Card.Body>
          <h5 className="mb-3">Degree Progress</h5>
          <ProgressBar 
            now={(completedCredits / totalCredits) * 100} 
            label={`${completedCredits}/${totalCredits} Credits`}
            className="custom-progress"
            variant="info"
            style={{ backgroundColor: '#e9ecef' }}
          >
            <ProgressBar 
              now={(completedCredits / totalCredits) * 100} 
              style={{ backgroundColor: 'var(--primary-color)' }}
            />
          </ProgressBar>
        </Card.Body>
      </Card>

      <Card className="custom-card">
          <Card.Header className="card-header-custom">
            <h5 className="mb-0">Student Details</h5>
          </Card.Header>
          <Card.Body>
            <Table responsive hover className="mb-0">
              <tbody>
                <tr>
                  <th className="table-light" style={{ width: '30%' }}>ID</th>
                  <td>250103928</td>
                </tr>
                <tr>
                  <th className="table-light">Student Name</th>
                  <td>Omar Adel Mohamed Elsayed Ahmed</td>
                </tr>
                <tr>
                  <th className="table-light">Degree</th>
                  <td>B.Tech</td>
                </tr>
                <tr>
                  <th className="table-light">Level</th>
                  <td>Level 1</td>
                </tr>
                <tr>
                  <th className="table-light">Academic Status</th>
                  <td>Regular</td>
                </tr>
                <tr>
                  <th className="table-light">Field</th>
                  <td>Field of Engineering Technology</td>
                </tr>
                <tr>
                  <th className="table-light">Student Program</th>
                  <td>Computer Science Technology Program</td>
                </tr>
                <tr>
                  <th className="table-light">Entrollment Status</th>
                  <td>Enrolled</td>
                </tr>
                <tr>
                  <th className="table-light">Total Passed Ch</th>
                  <td>-</td>
                </tr>
                <tr>
                  <th className="table-light">Registered Ch</th>
                  <td>15.00</td>
                </tr>
                <tr>
                  <th className="table-light">Scholarship</th>
                  <td>CS 40% - Fresh</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>

      {semesters.map((semester, index) => (
        <Card key={index} className="custom-card">
          <Card.Header className="card-header-custom">
            <h5 className="mb-0">{semester.name}</h5>
          </Card.Header>
          <Card.Body>
            <Table responsive hover className="mb-0">
              <thead className="table-light">
                <tr>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>Credits</th>
                  <th>Grade</th>
                  <th>GPA</th>
                </tr>
              </thead>
              <tbody>
                {semester.courses.map((course, idx) => (
                  <tr key={idx}>
                    <td><strong>{course.code}</strong></td>
                    <td>{course.name}</td>
                    <td>{course.credits}</td>
                    <td>
                      <span className={course.grade === 'In Progress' ? 'badge bg-warning' : 'badge badge-custom-secondary'}>
                        {course.grade}
                      </span>
                    </td>
                    <td>{course.gpa !== null ? course.gpa.toFixed(1) : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
