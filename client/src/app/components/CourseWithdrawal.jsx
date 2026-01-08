import { Card, Form, Button } from 'react-bootstrap';

export default function CourseWithdrawal() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Course Withdrawal Request</h1>
        <p className="page-subtitle">Submit a request to withdraw from a course</p>
      </div>

      <Card className="custom-card">
        <Card.Header className="card-header-custom">
          <h5 className="mb-0">Withdrawal Form</h5>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Select Course</Form.Label>
              <Form.Select size="lg">
                <option>Choose a course...</option>
                <option>CS301 - Algorithms</option>
                <option>CS303 - Database Systems</option>
                <option>CS305 - Computer Networks</option>
                <option>STAT201 - Probability & Statistics</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Reason for Withdrawal</Form.Label>
              <Form.Control as="textarea" rows={4} placeholder="Please explain your reason for withdrawal..." />
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
