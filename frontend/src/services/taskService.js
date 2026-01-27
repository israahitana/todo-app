import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";


const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// GET tasks
export const getTasks = async () => {
  const response = await axios.get(API_URL, getAuthHeader());
  return response.data;
};

// ADD task
export const addTask = async (taskData) => {
  const response = await axios.post(API_URL, taskData, getAuthHeader());
  return response.data;
};

// UPDATE task
export const updateTask = async (taskId, updatedData) => {
  const response = await axios.put( `http://localhost:5000/api/tasks/${taskId}`, updatedData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};



//  DELETE
export const deleteTask = async (taskId) => {
  await axios.delete(`${API_URL}/${taskId}`, getAuthHeader());
};
