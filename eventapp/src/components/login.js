import React, { useState } from "react";

function Login(props) {
  const [disabled, changeDisabled] = useState(false);

  const loginHandler = (v) => {
    v.preventDefault();
    changeDisabled(true);
    props.client
      .login(v.target.username.value, v.target.password.value)
      .then((response) => {
        changeDisabled(false);
        props.login(response.data.token);
      })
      .catch((err) => {
        alert("an error has happen in the login process");
        changeDisabled(false);
      });
  };

  return (
    <>
      Login
      <br />
      <form onSubmit={(v) => loginHandler(v)}>
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
          {" "}
          submit{" "}
        </button>
      </form>
    </>
  );
}

export default Login;
