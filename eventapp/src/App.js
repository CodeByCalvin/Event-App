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
  useLocation,
} from "react-router-dom";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

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

function AppContent() {
  const [token, changeToken] = useState(localStorage.getItem("token"));
  const [authenticated, setAuthenticated] = useState(!!token);
  const [eventList, setEventList] = useState([]);

  const location = useLocation();

  // Notifications
  toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: false,
    progressBar: true,
    positionClass: "toast-bottom-right",
    preventDuplicates: false,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "2000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  };

  const client = new ApiClient(
    () => token,
    () => handleLogout(),
    () => setAuthenticated(false),
    () => handleLogin()
  );

  const handleLogin = () => {
    setAuthenticated(true);
    changeToken(localStorage.getItem("token"));
    toastr["success"]("You have successfully logged in", "Login");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    changeToken(undefined);
    setAuthenticated(false);
    toastr["error"]("You have successfully logged out", "Logout");
  };

  return (
    <div className="App container">
      <div className="row">
        {location.pathname !== "/dashboard" && (
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <img
              src="https://play-lh.googleusercontent.com/e8gEo_Rl6kIjeXreXDXW4lxswkx1sOyzukaKUHWnaULAc4Xo9FbkmvI3grK6pa4QnKI"
              width="500"
              height="333"
              className="img-fluid"
              alt="The title of the app, The Event App"
            ></img>
          </div>
        )}
        <div
          className={`${
            location.pathname === "/dashboard" ? "col-md-12" : "col-md-6"
          } d-flex justify-content-center align-items-center`}
        >
          <Main
            authenticated={authenticated}
            handleLogin={handleLogin}
            eventList={eventList}
            setAuthenticated={setAuthenticated}
            handleLogout={handleLogout}
          />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <AppContent />
    </Router>
  );
}

export default App;
