import { Link, useNavigate } from "react-router-dom";//to navigate and link between pages
import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  //logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <button
        className="hamburger-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle sidebar"
      >
        ☰
      </button>

      <div className={`navbar ${isOpen ? "open" : ""}`}>
        <h2 className="logo">TaskApp</h2>

        <nav className="links">
          <Link to="/tasks" onClick={() => setIsOpen(false)}>📋 Accueil</Link>
          <Link to="/a-faire" onClick={() => setIsOpen(false)}>🕒 À faires</Link>
          <Link to="/en-cours" onClick={() => setIsOpen(false)}>🔄 En cours</Link>
          <Link to="/completed" onClick={() => setIsOpen(false)}>✅ Terminées</Link>
          <Link to="/calendar" onClick={() => setIsOpen(false)}>📅 Calendrier</Link>
        </nav>

        <button className="logout" onClick={handleLogout}>
          Se déconnecter
        </button>
      </div>

      {/* Overlay to close sidebar when clicking outside on mobile */}
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

export default Navbar;
