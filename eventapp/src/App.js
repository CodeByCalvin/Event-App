import "./css/App.css";
import React from "react";
import { useState } from "react";
import Dashboard from "./components/Dashboard";
import { ApiClient } from "./apiClient";
import Login from "./components/Login";
import Register from "./components/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

function Main(props) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          props.authenticated ? (
            <Navigate to="/dashboard" />
          ) : (
            <Login
              handleLogin={props.handleLogin}
              setAuthenticated={props.setAuthenticated}
            />
          )
        }
      />
      <Route
        path="/dashboard"
        element={
          props.authenticated ? (
            <Dashboard
              eventList={props.eventList}
              handleLogout={props.handleLogout}
            />
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  );
}

function App() {
  const [token, changeToken] = useState(localStorage.getItem("token"));
  const [authenticated, setAuthenticated] = useState(!!token);
  const [eventList, setEventList] = useState([
    {
      name: "Test event",
      date: "25th March 2023",
      description: "This is my event description",
      location: "Test location",
    },
  ]);

  const client = new ApiClient(
    () => token,
    () => handleLogout()
  );

  const handleLogin = async () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    changeToken(undefined);
    setAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        <h1>Event App</h1>
        <br />
        <br />
        <Main
          authenticated={authenticated}
          handleLogin={handleLogin}
          eventList={eventList}
          setAuthenticated={setAuthenticated}
          handleLogout={handleLogout}
        />
      </div>
    </Router>
  );
}

export default App;
