import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";//redirect after login

function Loginn() {
  const [email, setEmail] = useState("");//state for email
  const [password, setPassword] = useState("");//state for password
  const [error, setError] = useState("");//state for error message
  const [showPassword, setShowPassword] = useState(false);


  const navigate = useNavigate();//function to navigate programmatically

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await login(email, password);

      localStorage.setItem("token", data.token);//store token in localStorage

      navigate("/tasks");//navigate to tasks page after successful login
    } catch (err) {
      setError("Email ou mot de passe incorrect");//error message
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '1.5rem', color: 'var(--primary-color)' }}>Connexion</h1>

        {error && (
          <div style={{ 
            backgroundColor: '#fee2e2', 
            color: 'var(--error-color)', 
            padding: '0.75rem', 
            borderRadius: 'var(--radius-md)',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Email</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <input
                className="input-field"
                style={{ paddingLeft: '2.5rem' }}
                type="email"
                placeholder="exemple@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-secondary)" }}>
              Mot de passe
            </label>

            <div style={{ position: "relative" }}>
              {/* lock icon */}
              <div
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-secondary)",
                  pointerEvents: "none",
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>

              {/* password input */}
              <input
                className="input-field"
                style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {/* eye / eye-off */}
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "var(--text-secondary)",
                }}
                title={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              >
                {showPassword ? (
                  /* eye-off */
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 1l22 22" />
                    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20
                            c-5.05 0-9.29-3.15-11-8
                            1.21-3.1 3.77-5.54 6.94-6.64" />
                    <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4
                            c5.05 0 9.29 3.15 11 8
                            -0.66 1.69-1.7 3.2-3.06 4.39" />
                  </svg>
                ) : (
                  /* eye */
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </span>
            </div>
          </div>



          <button type="submit" style={{ width: '100%', marginTop: '1rem', padding: '0.8rem' }}>
            Se connecter
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Pas encore de compte ? <Link to="/register" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>S'inscrire</Link>
        </div>
      </div>
    </div>
  );
}

export default Loginn;
