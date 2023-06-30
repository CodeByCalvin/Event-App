import React, { useState } from "react";
import { Modal, Button, Container, Row, Col, Form } from "react-bootstrap";
import toastr from "toastr";

export default function RegisterModal(props) {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://event-app-api-qzts.onrender.com/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      if (response.ok) {
        console.log("User Registered");
        toastr.success("User Registered");
        handleClose();
      } else {
        const data = await response.json();
        console.log("There was an error registering the user:", data.message);
      }
    } catch (error) {
      console.log("Registration Failed, error:", error);
      toastr.error("Registration Failed");
    }
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Register
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col lg={12}>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formRegisterUsername">
                    <Form.Control
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={username}
                      onChange={handleUsernameChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formRegisterPassword">
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </Form.Group>
                  <Modal.Footer>
                    <Button type="submit" className="btn btn-primary">
                      Register
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Form>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
}
