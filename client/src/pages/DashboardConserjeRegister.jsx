import React from 'react';
import ConserjeNavbar from '../components/ConserjeNavbar.jsx';
import RegisterPaquete from './RegisterPaquete.jsx';

export default function DashboardConserjeRegister() {
  return (
    <>
      <ConserjeNavbar />
      <div className="container mt-5">
        <h2>Registrar Paquete (Área Conserje)</h2>
        <RegisterPaquete />
      </div>
    </>
  );
}
