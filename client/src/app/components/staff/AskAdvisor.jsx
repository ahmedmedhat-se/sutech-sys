import { Card, Form, Button, ListGroup } from 'react-bootstrap';

export default function AskAdvisor() {
  const previousMessages = [
    { date: '2024-12-15', subject: 'Course Selection Advice', status: 'Answered' },
    { date: '2024-11-28', subject: 'Academic Standing Question', status: 'Answered' },
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Ask Your Advisor</h1>
        <p className="page-subtitle">Contact your academic advisor for guidance</p>
      </div>

      <Card className="custom-card mb-4">
        <Card.Header className="card-header-custom">
          <h5 className="mb-0">Your Advisor Information</h5>
        </Card.Header>
        <Card.Body>
          <div className="mb-2"><strong>Name:</strong> Dr. Ahmed Hassan</div>
          <div className="mb-2"><strong>Email:</strong> ahmed.hassan@elsewedy.edu.eg</div>
          <div className="mb-2"><strong>Office:</strong> Building A, Room 305</div>
          <div className="mb-2"><strong>Office Hours:</strong> Sunday & Tuesday, 10:00 AM - 12:00 PM</div>
        </Card.Body>
      </Card>

      <Card className="custom-card mb-4">
        <Card.Header className="card-header-custom">
          <h5 className="mb-0">Send Message to Advisor</h5>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control type="text" size="lg" placeholder="Enter message subject" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={6} placeholder="Type your message here..." />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Priority</Form.Label>
              <Form.Select size="lg">
                <option>Normal</option>
                <option>High</option>
                <option>Urgent</option>
              </Form.Select>
            </Form.Group>
            <div className="d-grid gap-2">
              <Button className="btn-custom-primary" size="lg">Send Message</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <Card className="custom-card">
        <Card.Header className="card-header-custom">
          <h5 className="mb-0">Previous Messages</h5>
        </Card.Header>
        <Card.Body>
          <ListGroup>
            {previousMessages.map((msg, index) => (
              <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>{msg.subject}</strong>
                  <br />
                  <small className="text-muted">{msg.date}</small>
                </div>
                <span className="badge badge-custom-secondary">{msg.status}</span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
}
