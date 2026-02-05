import { Navigate } from "react-router-dom";//import Navigate for redirection

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");//get token from localStorage

  if (!token) {
    return <Navigate to="/login" />;//si pas de token, rediriger vers login
  }

  return children;//si token existe , render children(page protégée "homeTasks")
}

export default ProtectedRoute;
