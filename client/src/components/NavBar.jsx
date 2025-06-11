import React from 'react';
import { Link } from 'react-router-dom';


export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: 'var(--bs-primary)' }}>
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">MiSitio</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>

            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Registrar paquete</Link>
            </li>
          </ul>
          <div className="d-flex align-items-center gap-2">
            <Link to="/login" className="btn btn-light btn-sm text-primary">Iniciar sesión</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}