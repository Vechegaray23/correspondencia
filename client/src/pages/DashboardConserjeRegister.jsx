import React from 'react';
import ConserjeNavbar from '../components/ConserjeNavbar.jsx';
import RegisterPaquete from './RegisterPaquete.jsx';

export default function DashboardConserjeRegister() {
  return (
    <>
      <ConserjeNavbar />
      <div className="container mt-5">
        <RegisterPaquete />
      </div>
    </>
  );
}
