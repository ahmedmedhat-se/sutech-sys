import { Card, Form, Button, Table, Badge } from 'react-bootstrap';
import { useState } from 'react';

export default function RegisterAddDrop() {
  const [selectedAction, setSelectedAction] = useState('add');

  const availableCourses = [
    { code: 'CS401', name: 'Software Engineering', credits: 3, seats: 5 },
    { code: 'CS402', name: 'Artificial Intelligence', credits: 3, seats: 12 },
    { code: 'CS403', name: 'Web Development', credits: 3, seats: 8 },
  ];

  const registeredCourses = [
    { code: 'CS301', name: 'Algorithms', credits: 3 },
    { code: 'CS303', name: 'Database Systems', credits: 3 },
    { code: 'CS305', name: 'Computer Networks', credits: 3 },
    { code: 'STAT201', name: 'Probability & Statistics', credits: 3 },
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Register / Add / Drop Courses</h1>
        <p className="page-subtitle">Manage your course registration for the semester</p>
      </div>

      <Card className="custom-card mb-4">
        <Card.Header className="card-header-custom">
          <h5 className="mb-0">Action Selection</h5>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Select Action</Form.Label>
              <Form.Select 
                value={selectedAction} 
                onChange={(e) => setSelectedAction(e.target.value)}
                size="lg"
              >
                <option value="add">Add Course</option>
                <option value="drop">Drop Course</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>

      {selectedAction === 'add' && (
        <Card className="custom-card">
          <Card.Header className="card-header-custom">
            <h5 className="mb-0">Available Courses</h5>
          </Card.Header>
          <Card.Body>
            <Table responsive hover>
              <thead className="table-light">
                <tr>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>Credits</th>
                  <th>Available Seats</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {availableCourses.map((course, index) => (
                  <tr key={index}>
                    <td><strong>{course.code}</strong></td>
                    <td>{course.name}</td>
                    <td>{course.credits}</td>
                    <td>
                      <Badge bg={course.seats > 5 ? 'success' : 'warning'}>
                        {course.seats} seats
                      </Badge>
                    </td>
                    <td>
                      <Button size="sm" className="btn-custom-primary">
                        Add Course
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}

      {selectedAction === 'drop' && (
        <Card className="custom-card">
          <Card.Header className="card-header-custom">
            <h5 className="mb-0">Registered Courses</h5>
          </Card.Header>
          <Card.Body>
            <Table responsive hover>
              <thead className="table-light">
                <tr>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>Credits</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {registeredCourses.map((course, index) => (
                  <tr key={index}>
                    <td><strong>{course.code}</strong></td>
                    <td>{course.name}</td>
                    <td>{course.credits}</td>
                    <td>
                      <Button size="sm" variant="danger">
                        Drop Course
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}
