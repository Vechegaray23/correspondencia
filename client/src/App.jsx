// client/src/App.jsx
import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

import Home from './pages/Home.jsx';
import Health from './pages/Health.jsx';
import RegisterPaquete from './pages/RegisterPaquete.jsx';
import Login from './pages/Login.jsx';


import DashboardResidente from './pages/DashboardResidente.jsx';
import DashboardConserjeRegister from './pages/DashboardConserjeRegister.jsx';

import PaquetesCustodia from './pages/PaquetesCustodia.jsx';

export default function App() {
  const { pathname } = useLocation();
  const isDashboard = pathname.startsWith('/dashboard');

  return (
    <>
      {/* Navbar público solo si NO estamos en /dashboard/... */}
      {!isDashboard && (
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
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-2 mb-sm-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}

      <div className="container">
        <Routes>
          {/* Login */}
          <Route path="/login" element={<Login />} />



          {/* Dashboards */}
          <Route path="/dashboard/conserje/custodia" element={<PaquetesCustodia />} />
          <Route
            path="/dashboard/conserje/register"
            element={<DashboardConserjeRegister />}
          />
          <Route
            path="/dashboard/residente"
            element={<DashboardResidente />}
          />

          {/* Páginas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/health" element={<Health />} />
          <Route path="/register" element={<RegisterPaquete />} />
        </Routes>
      </div>
    </>
  );
}