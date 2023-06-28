import React from "react";
import { useState } from "react";
import LoginCSS from "../css/login.module.css";
import { Container, Row, Col, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login(props) {
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
        "https://event-app-api-qzts.onrender.com/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        console.log("User successfully logged in.");
        props.setAuthenticated(true);
        // window.location.href = "/";
      } else {
        console.error("Login failed.");
        setDisabled(false);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setDisabled(false);
    }
  }

  return (
    <Container>
      <Row>
        <Col lg={6}></Col>
        <Col lg={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Control
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </Form.Group>
            <button type="submit" className={LoginCSS.btn}>
              Login
            </button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
