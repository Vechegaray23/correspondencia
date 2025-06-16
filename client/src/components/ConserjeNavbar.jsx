import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function ConserjeNavbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ background: 'var(--bs-primary)' }}
    >
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          MiSitio
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#dashNavC"
          aria-controls="dashNavC"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="dashNavC">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard/conserje">
                Dashboard
              </Link>
            </li>


            <li className="nav-item">
              <Link className="nav-link" to="/dashboard/conserje/register">
                Registrar Paquete
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard/conserje/entregar">
                Entregar Paquete
              </Link>
            </li>

          </ul>
          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-light btn-sm text-primary"
              onClick={handleLogout}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
