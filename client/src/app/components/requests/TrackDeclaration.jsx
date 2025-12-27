import { Card, Form, Button } from 'react-bootstrap';

export default function TrackDeclaration() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Track Declaration Request</h1>
        <p className="page-subtitle">Declare your specialization track</p>
      </div>
      <Card className="custom-card">
        <Card.Header className="card-header-custom"><h5 className="mb-0">Track Declaration Form</h5></Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Select Track</Form.Label>
              <Form.Select size="lg">
                <option>Choose a track...</option>
                <option>Artificial Intelligence</option>
                <option>Cybersecurity</option>
                <option>Software Development</option>
                <option>Data Science</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Reason for Selection</Form.Label>
              <Form.Control as="textarea" rows={4} placeholder="Why did you choose this track?" />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button className="btn-custom-primary" size="lg">Submit Declaration</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}