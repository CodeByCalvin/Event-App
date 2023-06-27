import "./App.css";
import React from "react";
import { useState } from "react";
import Dashboard from "./components/Dashboard";
import AddEvent from "./components/AddEvent";

function App() {
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
      <Dashboard />
      <AddEvent setEventList={setEventList} eventList={eventList} />
    </div>
  );
}

export default App;
