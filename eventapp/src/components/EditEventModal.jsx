import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../css/editEventModal.css";

const EditEventModal = ({ show, handleClose, event, updateEvent }) => {
  const [name, setName] = useState(event.name);
  const [date, setDate] = useState(event.date);
  const [description, setDescription] = useState(event.description);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedEvent = {
      ...event,
      name: name,
      date: new Date(date).toDateString(),
      description: description,
    };

    updateEvent(updatedEvent);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEventName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formEventDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formEventDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditEventModal;
