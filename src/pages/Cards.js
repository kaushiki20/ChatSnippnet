import React from "react";
import { Card, Button, Form, Row } from "react-bootstrap";
import useRecorder from "../useRecorder";
function Cards() {
  let [audioURL, isRecording, startRecording, stopRecording] = useRecorder();
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
            <Form.Group>
              <Form.Label className="float-left">Customer</Form.Label>
              <Form.Control as="textarea" placeholder="Enter Text" />
              <audio id="player" src={audioURL} controls></audio>
              <button onClick={startRecording} disabled={isRecording}>
                start recording
              </button>
              <button onClick={stopRecording} disabled={!isRecording}>
                stop recording
              </button>
            </Form.Group>
            <Form.Group>
              <Form.Label className="float-right">Bot</Form.Label>
              <Form.Control as="textarea" placeholder="Enter Text" />
              <audio id="player" controls></audio>
            </Form.Group>
          </Card.Text>
          <Button variant="primary">Submit</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Cards;
