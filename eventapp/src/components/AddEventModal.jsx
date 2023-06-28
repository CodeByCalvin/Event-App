import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import AddEvent from "./AddEvent";

function AddEventModal(props) {
  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddEvent
          setEventList={props.setEventList}
          eventList={props.eventList}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddEventModal;
