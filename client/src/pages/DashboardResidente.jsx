import React from 'react';
import ResidenteNavbar from '../components/ResidenteNavbar.jsx';

export default function DashboardResidente() {
  return (
    <>
      <ResidenteNavbar />
      <div className="container mt-5">
        <h2>Panel de Residente</h2>
        <p>Bienvenido, residente. Aquí verás tu correspondencia.</p>
      </div>
    </>
  );
}
