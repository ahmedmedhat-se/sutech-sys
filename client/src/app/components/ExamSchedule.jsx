import { Card, Table, Badge, Row, Col } from 'react-bootstrap';

export default function ExamSchedule() {
  const exams = [
    {
      course: 'CS301',
      name: 'Algorithms',
      type: 'Final Exam',
      date: '2024-12-28',
      time: '09:00 AM - 11:00 AM',
      room: 'Hall A - Room 101',
      duration: '120 minutes',
      status: 'Upcoming',
    },
    {
      course: 'CS303',
      name: 'Database Systems',
      type: 'Final Exam',
      date: '2024-12-30',
      time: '01:00 PM - 03:00 PM',
      room: 'Hall B - Room 205',
      duration: '120 minutes',
      status: 'Upcoming',
    },
    {
      course: 'CS305',
      name: 'Computer Networks',
      type: 'Final Exam',
      date: '2025-01-02',
      time: '09:00 AM - 11:00 AM',
      room: 'Hall A - Room 103',
      duration: '120 minutes',
      status: 'Upcoming',
    },
    {
      course: 'STAT201',
      name: 'Probability & Statistics',
      type: 'Final Exam',
      date: '2025-01-05',
      time: '11:00 AM - 01:00 PM',
      room: 'Hall C - Room 301',
      duration: '120 minutes',
      status: 'Upcoming',
    },
  ];

  const midtermExams = [
    {
      course: 'CS301',
      name: 'Algorithms',
      type: 'Midterm Exam',
      date: '2024-11-15',
      time: '09:00 AM - 10:30 AM',
      room: 'Hall A - Room 101',
      status: 'Completed',
      score: '35/40',
    },
    {
      course: 'CS303',
      name: 'Database Systems',
      type: 'Midterm Exam',
      date: '2024-11-16',
      time: '01:00 PM - 02:30 PM',
      room: 'Hall B - Room 205',
      status: 'Completed',
      score: '32/40',
    },
    {
      course: 'CS305',
      name: 'Computer Networks',
      type: 'Midterm Exam',
      date: '2024-11-18',
      time: '09:00 AM - 10:30 AM',
      room: 'Hall A - Room 103',
      status: 'Completed',
      score: '36/40',
    },
    {
      course: 'STAT201',
      name: 'Probability & Statistics',
      type: 'Midterm Exam',
      date: '2024-11-20',
      time: '11:00 AM - 12:30 PM',
      room: 'Hall C - Room 301',
      status: 'Completed',
      score: '30/40',
    },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getDaysUntil = (dateString) => {
    const today = new Date();
    const examDate = new Date(dateString);
    const diffTime = examDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Exam Schedule</h1>
        <p className="page-subtitle">View your upcoming and past examination schedule</p>
      </div>

      <Row className="mb-4">
        <Col md={4}>
          <div className="stat-card stat-primary">
            <div className="stat-label">Upcoming Exams</div>
            <div className="stat-value">{exams.length}</div>
          </div>
        </Col>
        <Col md={4}>
          <div className="stat-card stat-secondary">
            <div className="stat-label">Next Exam In</div>
            <div className="stat-value">{getDaysUntil(exams[0].date)} Days</div>
          </div>
        </Col>
        <Col md={4}>
          <div className="stat-card stat-tertiary">
            <div className="stat-label">Completed Exams</div>
            <div className="stat-value">{midtermExams.length}</div>
          </div>
        </Col>
      </Row>

      <Card className="custom-card mb-4">
        <Card.Header className="card-header-custom">
          <h5 className="mb-0">Final Examinations - Fall 2024</h5>
        </Card.Header>
        <Card.Body>
          <Table responsive hover className="mb-0">
            <thead className="table-light">
              <tr>
                <th>Course</th>
                <th>Type</th>
                <th>Date</th>
                <th>Time</th>
                <th>Room</th>
                <th>Duration</th>
                <th>Countdown</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam, index) => {
                const daysUntil = getDaysUntil(exam.date);
                const urgency = daysUntil <= 3 ? 'danger' : daysUntil <= 7 ? 'warning' : 'success';
                
                return (
                  <tr key={index}>
                    <td>
                      <strong>{exam.course}</strong>
                      <br />
                      <small className="text-muted">{exam.name}</small>
                    </td>
                    <td><Badge bg="primary">{exam.type}</Badge></td>
                    <td>{formatDate(exam.date)}</td>
                    <td>{exam.time}</td>
                    <td>{exam.room}</td>
                    <td>{exam.duration}</td>
                    <td>
                      <Badge bg={urgency}>
                        {daysUntil > 0 ? `${daysUntil} days` : daysUntil === 0 ? 'Today' : 'Past'}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Card className="custom-card">
        <Card.Header className="card-header-custom">
          <h5 className="mb-0">Completed Midterm Examinations</h5>
        </Card.Header>
        <Card.Body>
          <Table responsive hover className="mb-0">
            <thead className="table-light">
              <tr>
                <th>Course</th>
                <th>Type</th>
                <th>Date</th>
                <th>Time</th>
                <th>Room</th>
                <th>Status</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {midtermExams.map((exam, index) => (
                <tr key={index}>
                  <td>
                    <strong>{exam.course}</strong>
                    <br />
                    <small className="text-muted">{exam.name}</small>
                  </td>
                  <td><Badge bg="info">{exam.type}</Badge></td>
                  <td>{formatDate(exam.date)}</td>
                  <td>{exam.time}</td>
                  <td>{exam.room}</td>
                  <td><Badge bg="success">{exam.status}</Badge></td>
                  <td><strong>{exam.score}</strong></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Card className="custom-card mt-4">
        <Card.Body>
          <h5 className="mb-3">Exam Guidelines</h5>
          <ul className="mb-0">
            <li className="mb-2">Arrive at least <strong>15 minutes before</strong> the exam start time.</li>
            <li className="mb-2">Bring your <strong>student ID card</strong> and required stationery.</li>
            <li className="mb-2">Electronic devices are <strong>not permitted</strong> during examinations.</li>
            <li className="mb-2">Check the room location in advance to avoid confusion.</li>
            <li>Follow all examination regulations to maintain academic integrity.</li>
          </ul>
        </Card.Body>
      </Card>
    </div>
  );
}