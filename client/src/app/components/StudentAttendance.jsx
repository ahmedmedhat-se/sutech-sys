import { Card, Table, ProgressBar, Row, Col, Badge } from 'react-bootstrap';

export default function StudentAttendance() {
  const courses = [
    { code: 'CS301', name: 'Algorithms', attended: 11, total: 12, percentage: 92 },
    { code: 'CS303', name: 'Database Systems', attended: 10, total: 12, percentage: 83 },
    { code: 'CS305', name: 'Computer Networks', attended: 12, total: 12, percentage: 100 },
    { code: 'STAT201', name: 'Probability & Statistics', attended: 9, total: 12, percentage: 75 },
  ];

  const overallAttendance = Math.round(
    (courses.reduce((acc, course) => acc + course.attended, 0) / 
     courses.reduce((acc, course) => acc + course.total, 0)) * 100
  );

  const getAttendanceStatus = (percentage) => {
    if (percentage >= 90) return { label: 'Excellent', variant: 'success' };
    if (percentage >= 75) return { label: 'Good', variant: 'primary' };
    if (percentage >= 60) return { label: 'Warning', variant: 'warning' };
    return { label: 'At Risk', variant: 'danger' };
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Student Attendance</h1>
        <p className="page-subtitle">Monitor your class attendance across all courses</p>
      </div>

      <Row className="mb-4">
        <Col md={4}>
          <div className="stat-card stat-primary">
            <div className="stat-label">Overall Attendance</div>
            <div className="stat-value">{overallAttendance}%</div>
          </div>
        </Col>
        <Col md={4}>
          <div className="stat-card stat-secondary">
            <div className="stat-label">Classes Attended</div>
            <div className="stat-value">
              {courses.reduce((acc, course) => acc + course.attended, 0)}/
              {courses.reduce((acc, course) => acc + course.total, 0)}
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className="stat-card stat-tertiary">
            <div className="stat-label">Active Courses</div>
            <div className="stat-value">{courses.length}</div>
          </div>
        </Col>
      </Row>

      <Card className="custom-card">
        <Card.Header className="card-header-custom">
          <h5 className="mb-0">Attendance by Course</h5>
        </Card.Header>
        <Card.Body>
          <Table responsive hover className="mb-0">
            <thead className="table-light">
              <tr>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Attended/Total</th>
                <th>Percentage</th>
                <th>Progress</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => {
                const status = getAttendanceStatus(course.percentage);
                return (
                  <tr key={index}>
                    <td><strong>{course.code}</strong></td>
                    <td>{course.name}</td>
                    <td>{course.attended}/{course.total}</td>
                    <td><strong>{course.percentage}%</strong></td>
                    <td style={{ width: '200px' }}>
                      <ProgressBar 
                        now={course.percentage} 
                        variant={status.variant}
                        style={{ height: '20px' }}
                      />
                    </td>
                    <td>
                      <Badge bg={status.variant}>{status.label}</Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Card className="custom-card mt-4">
        <Card.Body>
          <h5 className="mb-3">Attendance Policy Reminder</h5>
          <ul className="mb-0">
            <li className="mb-2">Students must maintain at least <strong>75% attendance</strong> to be eligible for final exams.</li>
            <li className="mb-2">Attendance below 60% may result in automatic course withdrawal.</li>
            <li className="mb-2">Medical excuses must be submitted within 48 hours of absence.</li>
            <li>Regular attendance positively impacts your academic performance and participation grades.</li>
          </ul>
        </Card.Body>
      </Card>
    </div>
  );
}