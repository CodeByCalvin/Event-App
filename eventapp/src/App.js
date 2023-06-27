import "./App.css";
import React from "react";
import { useState } from "react";
import Dashboard from "./components/Dashboard";
import AddEvent from "./components/AddEvent";
import { ApiClient } from "./apiClient";
import Login from "./components/Login";

function App() {
  const [token, changeToken] = useState(localStorage.getItem("token"));

  const client = new ApiClient(
    () => token,
    () => logout()
  );

  const login = (token) => {
    localStorage.setItem("token", token);
    changeToken(token);
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
      {token ? (
        <div>
          <Dashboard client={client} />
          <AddEvent setEventList={setEventList} eventList={eventList} />
        </div>
      ) : (
        <Login client={client} login={(token) => login(token)} />
      )}
    </div>
  );
}

export default App;
