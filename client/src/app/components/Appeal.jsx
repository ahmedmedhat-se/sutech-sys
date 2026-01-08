import { Card, Form, Button } from 'react-bootstrap';

export default function Appeal() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Appeal Request</h1>
        <p className="page-subtitle">Submit an academic appeal</p>
      </div>
      <Card className="custom-card">
        <Card.Header className="card-header-custom"><h5 className="mb-0">Appeal Form</h5></Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Appeal Type</Form.Label>
              <Form.Select size="lg">
                <option>Choose appeal type...</option>
                <option>Grade Appeal</option>
                <option>Academic Decision Appeal</option>
                <option>Disciplinary Appeal</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Related Course (if applicable)</Form.Label>
              <Form.Select size="lg"><option>N/A</option><option>CS301 - Algorithms</option></Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Appeal Statement</Form.Label>
              <Form.Control as="textarea" rows={5} placeholder="Provide detailed information about your appeal..." />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button className="btn-custom-primary" size="lg">Submit Appeal</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
