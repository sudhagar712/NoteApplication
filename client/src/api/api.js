import axios from "axios";

const API_URL = "http://localhost:9000/api";

// Set auth token for requests
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

// Auth APIs
export const signupUser = async (userData) => {
  return await axios.post(`${API_URL}/auth/signup`, userData);
};

export const loginUser = async (userData) => {
  return await axios.post(`${API_URL}/auth/login`, userData);
};

// Note APIs
export const fetchNotes = async () => {
  return await axios.get(`${API_URL}/note`, { headers: getAuthHeaders() });
};

export const addNote = async (noteData) => {
  return await axios.post(`${API_URL}/note/add`, noteData, { headers: getAuthHeaders() });
};

export const editNote = async (id, noteData) => {
  return await axios.put(`${API_URL}/note/${id}`, noteData, { headers: getAuthHeaders() });
};

export const deleteNote = async (id) => {
  return await axios.delete(`${API_URL}/note/${id}`, { headers: getAuthHeaders() });
};
