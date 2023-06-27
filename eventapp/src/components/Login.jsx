import React from "react";
import { useState } from "react";
import "../css/login.css";

export default function Login(props) {
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisabled(true);
    const username = e.target.username.value;
    const password = e.target.password.value;
    props.client
      .login(username, password)
      .then(() => {
        setDisabled(false);
        // if login is successful, the user will be redirected by the apiClient
      })
      .catch((error) => {
        alert("Login failed:", error);
        setDisabled(false);
      });
  };

  return (
    <>
      <h1>Login</h1>
      <br />
      <form onSubmit={handleSubmit}>
        Username:
        <br />
        <input type="text" name="username" disabled={disabled} />
        <br />
        Password:
        <br />
        <input type="password" name="password" disabled={disabled} />
        <br />
        <br />
        <button type="submit" disabled={disabled}>
          submit
        </button>
      </form>
    </>
  );
}
