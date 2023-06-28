import React, { useState } from "react";
import { ApiClient } from "../apiClient";
import { Modal, Button, Form } from "react-bootstrap";
import "../css/addEvent.module.css";

function AddEvent(props) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  // Need to use tokenProvider and logoutHandler in the future
  const apiClient = new ApiClient();

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeDate = (event) => {
    setDate(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleAdd = async () => {
    const newItem = {
      id: Date.now(),
      name: name,
      date: date,
      description: description,
    };

    try {
      await apiClient.addEvent(newItem);
      props.setEventList((prevEvents) => [...prevEvents, newItem]);
      setName("");
      setDate("");
      setDescription("");
    } catch (error) {
      console.error("Failed to add event:", error);
    }
  };

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formEventName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={handleChangeName}
              placeholder="Enter event name"
            />
          </Form.Group>

          <Form.Group controlId="formEventDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={handleChangeDate}
            />
          </Form.Group>

          <Form.Group controlId="formEventDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={handleChangeDescription}
              placeholder="Enter event description"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAdd}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddEvent;
