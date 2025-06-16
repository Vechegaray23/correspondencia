// client/src/App.jsx
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import NavBar from './components/NavBar.jsx';

import Home from './pages/Home.jsx';
import Health from './pages/Health.jsx';
import RegisterPaquete from './pages/RegisterPaquete.jsx';

import Login from './pages/Login.jsx';

import DashboardResidente from './pages/DashboardResidente.jsx';
import DashboardConserje from './pages/DashboardConserje.jsx';

import DashboardConserjeRegister from './pages/DashboardConserjeRegister.jsx';
import EntregarPaquete from './pages/EntregarPaquete.jsx';


import PaquetesCustodia from './pages/PaquetesCustodia.jsx';

export default function App() {
  const { pathname } = useLocation();
  const isDashboard = pathname.startsWith('/dashboard');

  return (
    <>
      {/* Navbar público solo si NO estamos en /dashboard/... */}
      {!isDashboard && <NavBar />}

      <Routes>
        {/* Login */}
        <Route path="/login" element={<Login />} />
        {/* Dashboards */}
        <Route path="/dashboard/conserje" element={<DashboardConserje />} />

        <Route path="/dashboard/conserje/custodia" element={<PaquetesCustodia />} />
        <Route path="/dashboard/conserje/register" element={<DashboardConserjeRegister />} />
        <Route path="/dashboard/conserje/entregar" element={<EntregarPaquete />} />

        <Route path="/dashboard/residente" element={<DashboardResidente />} />

        {/* Páginas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/health" element={<Health />} />
        <Route path="/register" element={<RegisterPaquete />} />
      </Routes>
    </>
  );
}
