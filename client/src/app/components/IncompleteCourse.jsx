import { Card, Form, Button } from 'react-bootstrap';

export default function IncompleteCourse() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Incomplete Course Request</h1>
        <p className="page-subtitle">Request an incomplete grade for a course</p>
      </div>
      <Card className="custom-card">
        <Card.Header className="card-header-custom"><h5 className="mb-0">Incomplete Grade Request</h5></Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Course</Form.Label>
              <Form.Select size="lg"><option>Choose a course...</option><option>CS301 - Algorithms</option></Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Reason for Incomplete</Form.Label>
              <Form.Control as="textarea" rows={4} placeholder="Please provide a detailed reason..." />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Supporting Documents</Form.Label>
              <Form.Control type="file" />
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
