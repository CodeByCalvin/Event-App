import "./App.css";
import React from "react";
import { useState } from "react";
import Dashboard from "./components/dashboard";

function App() {
  return (
    <div className="App">
      <div>Event App</div>
      <Dashboard />
    </div>
  );
}

export default App;
