import React from "react";
import { Card, Button, Form, Row } from "react-bootstrap";

function Cards() {
  return (
    <div>
      <Card
        style={{
          width: "18rem",
        }}
      >
        <Card.Body>
          <Card.Title>Snip</Card.Title>

          <Card.Text>
            <Form.Group as={Row}>
              <Form.Label>Customer</Form.Label>
              <Form.Control as="textarea" placeholder="Enter Text" />

              <Form.Label>Bot</Form.Label>
              <Form.Control as="textarea" placeholder="Enter Text" />
            </Form.Group>
          </Card.Text>
          <Button variant="primary">Submit</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Cards;
