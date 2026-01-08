import { Card, Form, Button } from 'react-bootstrap';

export default function StudentServices() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Student Services Request</h1>
        <p className="page-subtitle">Request various student services and documents</p>
      </div>

      <Card className="custom-card">
        <Card.Header className="card-header-custom">
          <h5 className="mb-0">Service Request Form</h5>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Service Type</Form.Label>
              <Form.Select size="lg">
                <option>Choose a service...</option>
                <option>Transcript Request</option>
                <option>Enrollment Certificate</option>
                <option>Grade Report</option>
                <option>Student ID Replacement</option>
                <option>Document Authentication</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Number of Copies</Form.Label>
              <Form.Control type="number" min="1" max="5" defaultValue="1" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Additional Notes</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Any special instructions..." />
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
