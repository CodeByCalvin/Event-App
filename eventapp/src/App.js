import "./App.css";
import React from "react";
import { useState } from "react";
import Dashboard from "./components/Dashboard";
import { ApiClient } from "./apiClient";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [token, changeToken] = useState(localStorage.getItem("token"));
  const [authenticated, setAuthenticated] = useState(false);

  const client = new ApiClient(
    () => token,
    () => logout()
  );

  const handleLogin = async () => {
    setAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    changeToken(undefined);
  };

  const [eventList, setEventList] = useState([
    {
      name: "Test event",
      date: "25th March 2023",
      description: "This is my event description",
      location: "Test location",
    },
  ]);

  return (
    <div className="App">
      <h1>Event App</h1>
      <br />
      <br />

      {authenticated ? (
        <div>
          <Dashboard client={client} />
        </div>
      ) : (
        <Login
          handleLogin={handleLogin}
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      )}

      <Register />
    </div>
  );
}

export default App;
