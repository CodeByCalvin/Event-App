import { useState, useEffect } from "react";
import { ApiClient } from "../apiClient";
import EditEventModal from "./EditEventModal";
import AddEvent from "./AddEvent";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../css/dashboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

// Token and logout handler
const dummyTokenProvider = () => localStorage.getItem("token");
const dummyLogoutHandler = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

const apiClient = new ApiClient(dummyTokenProvider, dummyLogoutHandler);

const Dashboard = (props) => {
  const [eventList, setEventList] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    props.handleLogout();
    navigate("/");
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await apiClient.getEvents();
      setEventList(data);
    };

    fetchEvents();
  }, [eventList]);

  const handleDelete = async (id) => {
    await apiClient.deleteEvent(id);
    const newEventList = eventList.filter((event) => event._id !== id);
    setEventList(newEventList);
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleUpdateEvent = async (updatedEvent) => {
    await apiClient.updateEvent(updatedEvent._id, updatedEvent);
    const newEventList = eventList.map((event) =>
      event._id === updatedEvent._id ? updatedEvent : event
    );
    setEventList(newEventList);
    setShowEditModal(false);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2 className="sub-header">Your Event Dashboard</h2>
        </Col>
        <Col className="text-right">
          <button
            className={styles["post-btn"]}
            onClick={() => setShowAddModal(true)}
          >
            <FontAwesomeIcon
              icon={faCalendarPlus}
              style={{ color: "#000000" }}
            />{" "}
            Add Event
          </button>
          <button className={styles["logout-btn"]} onClick={handleLogout}>
            <FontAwesomeIcon
              icon={faRightFromBracket}
              style={{ color: "#000000" }}
            />{" "}
            Logout
          </button>
        </Col>
      </Row>
      <Table responsive="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {eventList.map((event, index) => {
            const key = event._id ?? index;

            const dateObject = new Date(event.date);
            const day = dateObject.getDate();
            const monthNames = [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ];
            const monthName = monthNames[dateObject.getMonth()];
            const year = dateObject.getFullYear();
            const formattedDate = `${day} ${monthName} ${year}`;
            return (
              <tr key={key}>
                <td>{event.name}</td>
                <td>{formattedDate}</td>
                <td>{event.description}</td>
                <td>
                  <button
                    className={styles["edit-btn"]}
                    onClick={() => handleEdit(event)}
                  >
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      style={{ color: "#000000" }}
                    />
                  </button>
                  <button
                    className={styles["delete-btn"]}
                    onClick={() => handleDelete(event._id)}
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ color: "#000000" }}
                    />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {showEditModal && selectedEvent && (
        <EditEventModal
          show={showEditModal}
          handleClose={handleCloseEditModal}
          event={selectedEvent}
          updateEvent={handleUpdateEvent}
        />
      )}
      {showAddModal && (
        <AddEvent
          show={showAddModal}
          handleClose={handleCloseAddModal}
          setEventList={setEventList}
          eventList={eventList}
        />
      )}
    </Container>
  );
};

export default Dashboard;
