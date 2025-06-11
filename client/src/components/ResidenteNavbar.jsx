import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function ResidenteNavbar() {
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
        <Link className="navbar-brand fw-bold" to="/dashboard/residente">
          Panel Residente
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#dashNavR"
          aria-controls="dashNavR"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="dashNavR">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
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
