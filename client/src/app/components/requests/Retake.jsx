import { Card, Form, Button, Table } from 'react-bootstrap';

export default function Retake() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Re-take Request</h1>
        <p className="page-subtitle">Request to retake a course</p>
      </div>
      <Card className="custom-card mb-3">
        <Card.Header className="card-header-custom"><h5 className="mb-0">Eligible Courses for Retake</h5></Card.Header>
        <Card.Body>
          <Table responsive>
            <thead className="table-light">
              <tr><th>Course Code</th><th>Course Name</th><th>Previous Grade</th><th>Action</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>CS201</strong></td>
                <td>Programming II</td>
                <td><span className="badge bg-warning">D</span></td>
                <td><Button size="sm" className="btn-custom-primary">Request Retake</Button></td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <Card className="custom-card">
        <Card.Header className="card-header-custom"><h5 className="mb-0">Retake Request Form</h5></Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Select Course</Form.Label>
              <Form.Select size="lg"><option>CS201 - Programming II</option></Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Preferred Semester</Form.Label>
              <Form.Select size="lg"><option>Spring 2025</option><option>Summer 2025</option></Form.Select>
            </Form.Group>
            <div className="d-grid gap-2">
              <Button className="btn-custom-primary" size="lg">Submit Request</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
