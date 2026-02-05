import axios from "axios";//import axios for making HTTP requests

const API_URL = "http://localhost:5000/api/auth";//backend auth API base URL port

export const login = async (email, password) => { //recoit email et password
  const response = await axios.post(`${API_URL}/login`, {   //send POST request to login 
    email,
    password,
  });

  return response.data;//return response data user info and token
};


export const register = async (email, password) => {
  const response = await axios.post(`${API_URL}/register`, {
    email,
    password,
  });
  return response.data;
};
