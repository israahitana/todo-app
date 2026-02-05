import axios from "axios"; //bibliotheque pour faire des requetes http(get, post, put , delete)

const api = axios.create({
  baseURL: "http://localhost:5000",//backend 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Récupère le token du localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api; //pour utiliser api dans d'autres fichiers directement sans refaire l'import axios
