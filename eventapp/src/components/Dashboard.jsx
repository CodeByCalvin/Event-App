import { useState, useEffect } from "react";
import { getEvents, deleteEvent, updateEvent } from "../apiClient";
import EditEventModal from "./EditEventModal";

const Dashboard = () => {
  const [eventList, setEventList] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getEvents();
      setEventList(data);
    };

    fetchEvents();
  }, [eventList]);

  const handleDelete = async (id) => {
    await deleteEvent(id);
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
    await updateEvent(updatedEvent._id, updatedEvent);
    const newEventList = eventList.map((event) =>
      event._id === updatedEvent._id ? updatedEvent : event
    );
    setEventList(newEventList);
    setShowEditModal(false);
  };

  return (
    <div>
      <h2>Event Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {eventList.map((event) => {
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
              <tr key={event._id}>
                <td>{event.name}</td>
                <td>{formattedDate}</td>
                <td>{event.description}</td>
                <td>
                  <button onClick={() => handleEdit(event)}>Edit</button>
                  <button onClick={() => handleDelete(event._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showEditModal && selectedEvent && (
        <EditEventModal
          show={showEditModal}
          handleClose={handleCloseEditModal}
          event={selectedEvent}
          updateEvent={handleUpdateEvent}
        />
      )}
    </div>
  );
};

export default Dashboard;
