import { Card, Table, ProgressBar, Row, Col } from 'react-bootstrap';

export default function SemesterActivityMarks() {
  const courses = [
    {
      code: 'CS301',
      name: 'Algorithms',
      activities: [
        { name: 'Quiz 1', score: 8, total: 10, weight: 10 },
        { name: 'Quiz 2', score: 9, total: 10, weight: 10 },
        { name: 'Midterm Exam', score: 35, total: 40, weight: 30 },
        { name: 'Assignment 1', score: 18, total: 20, weight: 15 },
        { name: 'Final Exam', score: null, total: 50, weight: 35 },
      ],
    },
    {
      code: 'CS303',
      name: 'Database Systems',
      activities: [
        { name: 'Quiz 1', score: 9, total: 10, weight: 10 },
        { name: 'Project Phase 1', score: 22, total: 25, weight: 20 },
        { name: 'Midterm Exam', score: 32, total: 40, weight: 30 },
        { name: 'Quiz 2', score: null, total: 10, weight: 5 },
        { name: 'Final Exam', score: null, total: 50, weight: 35 },
      ],
    },
    {
      code: 'CS305',
      name: 'Computer Networks',
      activities: [
        { name: 'Lab Assignments', score: 28, total: 30, weight: 20 },
        { name: 'Midterm Exam', score: 36, total: 40, weight: 30 },
        { name: 'Quiz 1', score: 10, total: 10, weight: 10 },
        { name: 'Project', score: null, total: 20, weight: 15 },
        { name: 'Final Exam', score: null, total: 50, weight: 25 },
      ],
    },
    {
      code: 'STAT201',
      name: 'Probability & Statistics',
      activities: [
        { name: 'Quiz 1', score: 7, total: 10, weight: 10 },
        { name: 'Quiz 2', score: 8, total: 10, weight: 10 },
        { name: 'Midterm Exam', score: 30, total: 40, weight: 30 },
        { name: 'Homework', score: 15, total: 15, weight: 15 },
        { name: 'Final Exam', score: null, total: 50, weight: 35 },
      ],
    },
  ];

  const calculateCourseScore = (activities) => {
    const totalEarned = activities
      .filter(a => a.score !== null)
      .reduce((sum, a) => sum + ((a.score / a.total) * a.weight), 0);
    const totalWeight = activities
      .filter(a => a.score !== null)
      .reduce((sum, a) => sum + a.weight, 0);
    return totalWeight > 0 ? (totalEarned / totalWeight) * 100 : 0;
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Semester Activity Marks</h1>
        <p className="page-subtitle">Track your performance in all course activities and assessments</p>
      </div>

      <Row className="mb-4">
        {courses.map((course, index) => (
          <Col md={6} key={index} className="mb-3">
            <div className="stat-card">
              <div className="stat-label">{course.code}</div>
              <div className="stat-value" style={{ color: 'var(--secondary-color)', fontSize: '2rem' }}>
                {Math.round(calculateCourseScore(course.activities))}%
              </div>
              <div style={{ fontSize: '0.9rem', color: '#6c757d' }}>{course.name}</div>
            </div>
          </Col>
        ))}
      </Row>

      {courses.map((course, courseIndex) => {
        const currentScore = calculateCourseScore(course.activities);
        
        return (
          <Card key={courseIndex} className="custom-card">
            <Card.Header className="card-header-custom">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">{course.code} - {course.name}</h5>
                <span className="badge bg-light text-dark">Current: {Math.round(currentScore)}%</span>
              </div>
            </Card.Header>
            <Card.Body>
              <Table responsive hover className="mb-3">
                <thead className="table-light">
                  <tr>
                    <th>Activity</th>
                    <th>Score</th>
                    <th>Total</th>
                    <th>Percentage</th>
                    <th>Weight</th>
                    <th>Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {course.activities.map((activity, actIndex) => {
                    const percentage = activity.score !== null 
                      ? (activity.score / activity.total) * 100 
                      : null;
                    
                    return (
                      <tr key={actIndex}>
                        <td><strong>{activity.name}</strong></td>
                        <td>{activity.score !== null ? activity.score : '-'}</td>
                        <td>{activity.total}</td>
                        <td>
                          {percentage !== null ? (
                            <span className={percentage >= 85 ? 'text-success' : percentage >= 70 ? 'text-primary' : 'text-warning'}>
                              {Math.round(percentage)}%
                            </span>
                          ) : (
                            <span className="badge bg-secondary">Pending</span>
                          )}
                        </td>
                        <td>{activity.weight}%</td>
                        <td style={{ width: '150px' }}>
                          {percentage !== null ? (
                            <ProgressBar 
                              now={percentage} 
                              variant={percentage >= 85 ? 'success' : percentage >= 70 ? 'primary' : 'warning'}
                              style={{ height: '18px' }}
                            />
                          ) : (
                            <ProgressBar 
                              now={0} 
                              variant="secondary"
                              style={{ height: '18px' }}
                              label="N/A"
                            />
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              
              <div className="mt-3 p-3 bg-light rounded">
                <Row>
                  <Col md={6}>
                    <strong>Current Weighted Score:</strong> {Math.round(currentScore)}%
                  </Col>
                  <Col md={6}>
                    <strong>Completed Activities:</strong> {course.activities.filter(a => a.score !== null).length}/{course.activities.length}
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}
