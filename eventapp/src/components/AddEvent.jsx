import React, { useState } from "react";
import { ApiClient } from "../apiClient";
import { Form, Button } from "react-bootstrap";
import "../css/addEvent.module.css";

function AddEvent(props) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  // Create an instance of ApiClient
  // Replace tokenProvider and logoutHandler with actual implementations
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
      // Now call addEvent on the apiClient instance
      await apiClient.addEvent(newItem);
      props.setEventList((prevEvents) => [...prevEvents, newItem]);
      setName("");
      setDate("");
      setDescription("");
    } catch (error) {
      console.error("Failed to add event:", error);
    }
  };

  const handleDelete = (id) => {
    props.setEventList(props.eventList.filter((item) => item.id !== id));
  };

  return (
    <div className="container">
      <h2>Add Event</h2>
      <div>
        <label>
          Name:
          <input type="text" value={name} onChange={handleChangeName} />
        </label>
        <br />
        <Form.Group controlId="formEventDate">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={handleChangeDescription}
          />
        </label>
        <button type="button" onClick={handleAdd}>
          Add
        </button>
      </div>
      <ul></ul>
    </div>
  );
}

export default AddEvent;
