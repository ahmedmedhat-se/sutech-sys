import { Card, Form, Button, Table } from 'react-bootstrap';

export default function OnlinePayment() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Online Payment</h1>
        <p className="page-subtitle">View and pay your tuition and fees</p>
      </div>
      <Card className="custom-card mb-3">
        <Card.Header className="card-header-custom"><h5 className="mb-0">Outstanding Balance</h5></Card.Header>
        <Card.Body>
          <Table>
            <tbody>
              <tr><td>Tuition Fees</td><td className="text-end"><strong>15,000 EGP</strong></td></tr>
              <tr><td>Activities Fee</td><td className="text-end"><strong>500 EGP</strong></td></tr>
              <tr><td>Library Fee</td><td className="text-end"><strong>200 EGP</strong></td></tr>
              <tr className="table-active"><td><strong>Total Due</strong></td><td className="text-end"><strong>15,700 EGP</strong></td></tr>
            </tbody>
          </Table>
          <div className="d-grid gap-2">
            <Button className="btn-custom-primary" size="lg">Proceed to Payment</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
