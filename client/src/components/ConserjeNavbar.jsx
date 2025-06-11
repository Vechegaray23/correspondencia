import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function ConserjeNavbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
      <div className="container-fluid">
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
          <ul className="navbar-nav me-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/dashboard/conserje/custodia">
                Paquetes Custodia
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
            <li className="nav-item">
              <button
                className="btn btn-link nav-link"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
