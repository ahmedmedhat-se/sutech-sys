import { Card, Form, Button } from 'react-bootstrap';

export default function ChangeProgram() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Change of Program Request</h1>
        <p className="page-subtitle">Request to change your academic program</p>
      </div>
      <Card className="custom-card">
        <Card.Header className="card-header-custom"><h5 className="mb-0">Program Change Form</h5></Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Current Program</Form.Label>
              <Form.Control type="text" value="Computer Science" disabled />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Requested Program</Form.Label>
              <Form.Select size="lg">
                <option>Choose a program...</option>
                <option>Software Engineering</option>
                <option>Information Systems</option>
                <option>Computer Engineering</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Reason for Change</Form.Label>
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