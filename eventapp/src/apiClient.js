import axios from "axios";

const API_URL = "http://localhost:3001";

export const getEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/events`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const addEvent = async (event) => {
  try {
    const response = await axios.post(`${API_URL}/events/post`, event);
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateEvent = async (id, event) => {
  try {
    const response = await axios.put(`${API_URL}/events/edit/${id}`, event);
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteEvent = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/events/delete/${id}`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};
