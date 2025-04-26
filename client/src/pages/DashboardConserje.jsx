import React from 'react';
import ConserjeNavbar from '../components/ConserjeNavbar.jsx';
import RegisterPaquete from './RegisterPaquete.jsx';

export default function DashboardConserje() {
  return (
    <>
      <ConserjeNavbar />
      <div className="container mt-5">
        <h2>Panel de Conserje</h2>
        <p>Bienvenido, conserje. Aquí puedes gestionar tus paquetes.</p>

        <hr />
      </div>
    </>
  );
}
