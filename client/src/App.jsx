import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Health from './pages/Health.jsx';
import RegisterPaquete from './pages/RegisterPaquete.jsx';
import LoginConserje from './pages/LoginConserje.jsx';
import LoginResidente from './pages/LoginResidente.jsx';
import DashboardConserje from './pages/DashboardConserje.jsx';
import DashboardResidente from './pages/DashboardResidente.jsx';

export default function App() {
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Correspondencia
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-sm-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/health">
                  Health Check
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Registrar Paquete
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login/conserje">
                  Login Conserje
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login/residente">
                  Login Residente
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container">
        <Routes>
          {/* Login */}
          <Route path="/login/conserje" element={<LoginConserje />} />
          <Route path="/login/residente" element={<LoginResidente />} />

          {/* Páginas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/health" element={<Health />} />
          <Route path="/register" element={<RegisterPaquete />} />

          {/* Dashboards protegidos */}
          <Route
            path="/dashboard/conserje"
            element={<DashboardConserje />}
          />
          <Route
            path="/dashboard/residente"
            element={<DashboardResidente />}
          />
        </Routes>
      </div>
    </>
  );
}