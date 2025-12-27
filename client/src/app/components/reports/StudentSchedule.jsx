import { Card, Table, Button } from 'react-bootstrap';

export default function StudentSchedule() {
  const schedule = [
    { day: 'Sunday', courses: [
      { time: '08:00 - 09:30', code: 'CS301', name: 'Algorithms', room: 'Lab 2', type: 'Lecture' },
      { time: '10:00 - 11:30', code: 'CS303', name: 'Database Systems', room: 'Hall A', type: 'Lecture' },
    ]},
    { day: 'Monday', courses: [
      { time: '09:00 - 10:30', code: 'CS305', name: 'Computer Networks', room: 'Lab 3', type: 'Lab' },
      { time: '11:00 - 12:30', code: 'STAT201', name: 'Probability & Statistics', room: 'Hall B', type: 'Lecture' },
    ]},
    { day: 'Tuesday', courses: [
      { time: '08:00 - 09:30', code: 'CS301', name: 'Algorithms', room: 'Lab 2', type: 'Tutorial' },
      { time: '13:00 - 14:30', code: 'CS303', name: 'Database Systems', room: 'Lab 1', type: 'Lab' },
    ]},
    { day: 'Wednesday', courses: [
      { time: '10:00 - 11:30', code: 'CS305', name: 'Computer Networks', room: 'Hall C', type: 'Lecture' },
    ]},
    { day: 'Thursday', courses: [
      { time: '09:00 - 10:30', code: 'STAT201', name: 'Probability & Statistics', room: 'Lab 4', type: 'Tutorial' },
      { time: '11:00 - 12:30', code: 'CS301', name: 'Algorithms', room: 'Hall A', type: 'Lecture' },
    ]},
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Student Schedule</h1>
        <p className="page-subtitle">Your weekly class schedule for Fall 2024</p>
      </div>

      <div className="mb-3 text-end">
        <Button className="btn-custom-primary me-2">Print Schedule</Button>
        <Button className="btn-custom-secondary">Export to Calendar</Button>
      </div>

      <Card className="custom-card">
        <Card.Header className="card-header-custom">
          <h5 className="mb-0">Weekly Schedule</h5>
        </Card.Header>
        <Card.Body>
          {schedule.map((day, dayIndex) => (
            <div key={dayIndex} className="mb-4">
              <h5 className="mb-3" style={{ color: 'var(--secondary-color)' }}>{day.day}</h5>
              <Table responsive bordered hover>
                <thead className="table-light">
                  <tr>
                    <th>Time</th>
                    <th>Course Code</th>
                    <th>Course Name</th>
                    <th>Room</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {day.courses.length > 0 ? (
                    day.courses.map((course, courseIndex) => (
                      <tr key={courseIndex}>
                        <td><strong>{course.time}</strong></td>
                        <td><strong>{course.code}</strong></td>
                        <td>{course.name}</td>
                        <td>{course.room}</td>
                        <td>
                          <span className={`badge ${course.type === 'Lecture' ? 'badge-custom-primary' : course.type === 'Lab' ? 'badge-custom-secondary' : 'badge-custom-tertiary'}`}>
                            {course.type}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center text-muted">No classes scheduled</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          ))}
        </Card.Body>
      </Card>

      <Card className="custom-card mt-4">
        <Card.Body>
          <h5 className="mb-3">Schedule Summary</h5>
          <div className="row">
            <div className="col-md-4 mb-2"><strong>Total Classes per Week:</strong> 11</div>
            <div className="col-md-4 mb-2"><strong>Credit Hours:</strong> 12</div>
            <div className="col-md-4 mb-2"><strong>Active Courses:</strong> 4</div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
