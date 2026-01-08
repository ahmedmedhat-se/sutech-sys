import { Card, Form, Button } from 'react-bootstrap';

export default function DropCourse() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Drop Course Request</h1>
        <p className="page-subtitle">Request to drop a course from your schedule</p>
      </div>
      <Card className="custom-card">
        <Card.Header className="card-header-custom"><h5 className="mb-0">Drop Course Form</h5></Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Select Course to Drop</Form.Label>
              <Form.Select size="lg">
                <option>Choose a course...</option>
                <option>CS301 - Algorithms</option>
                <option>CS303 - Database Systems</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Reason</Form.Label>
              <Form.Control as="textarea" rows={4} />
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
