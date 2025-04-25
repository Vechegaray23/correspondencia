import React from 'react';
import ConserjeNavbar from '../components/ConserjeNavbar.jsx';

export default function DashboardConserje() {
  return (
    <>
      <ConserjeNavbar />
      <div className="container mt-5">
        <h2>Panel de Conserje</h2>
        <p>Bienvenido, conserje. Aquí irán tus herramientas.</p>
      </div>
    </>
  );
}
