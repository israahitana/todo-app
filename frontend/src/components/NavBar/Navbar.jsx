import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <h2 className="logo">TaskApp</h2>

      <nav className="links">
        <Link to="/tasks">📋 Accueil</Link>
        <Link to="/a-faire">🕒 À faires</Link>
        <Link to="/en-cours">🔄 En cours</Link>
        <Link to="/completed">✅ Terminées</Link>
        <Link to="/calendar">📅 Calendrier</Link>

      </nav>

      <button className="logout" onClick={handleLogout}>
        Se déconnecter
      </button>
    </div>
  );
}

export default Navbar;
