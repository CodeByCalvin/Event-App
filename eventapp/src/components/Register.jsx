import React from "react";
import { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";

export default function Register(props) {
  const [disabled, setDisabled] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setDisabled(true);

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
        setDisabled(false);
      } else {
        console.log("There was an error registering the user");
        setDisabled(false);
      }
    } catch (error) {
      console.log("Registration Failed, error:", error);
      setDisabled(false);
    }
  }
  return (
    <Container>
      <Row>
        <Col lg={6}></Col>
        <Col lg={6}>
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
            <button type="submit" className={Register.btn}>
              Register
            </button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
