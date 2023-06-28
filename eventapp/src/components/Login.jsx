import React from "react";
import { useState } from "react";
import "../css/login.css";

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
    <>
      <h1>Login</h1>
      <br />
      <form onSubmit={handleSubmit}>
        Username:
        <br />
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
          disabled={disabled}
        />
        <br />
        Password:
        <br />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          disabled={disabled}
        />
        <br />
        <br />
        <button type="submit" disabled={disabled}>
          Login
        </button>
      </form>
    </>
  );
}
