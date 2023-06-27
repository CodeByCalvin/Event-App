import React, { useState } from "react";
import { addEvent } from "../apiClient";
import { Form, Button } from "react-bootstrap";

function AddEvent(props) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

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
      await addEvent(newItem);
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
        {/* <label>
          Date:
          <input type="text" value={date} onChange={handleChangeDate} />
        </label> */}
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
