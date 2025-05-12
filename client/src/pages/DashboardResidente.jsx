import React, { useState, useEffect } from 'react';
import ResidenteNavbar from '../components/ResidenteNavbar.jsx';

export default function DashboardResidente() {
  const [paquetes, setPaquetes] = useState([]);
  const [error, setError]       = useState('');

  // depto guardado en login
  const depto = localStorage.getItem('depto');
  const API   = `${import.meta.env.VITE_API_URL}/api/v1/paquetes?depto=${depto}`;

  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => {
        if (data.error) throw new Error(data.error);
        setPaquetes(data);
      })
      .catch(err => setError(err.message));
  }, [API]);

  return (
    <>
      <ResidenteNavbar />
      <div className="container mt-4">
        <h2>Mis Paquetes (Depto {depto})</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Depto</th>
                <th>Receptor</th>
                <th>Destinatario</th>
                <th>Comentarios</th>
                <th>Urgencia</th>
                <th>Estado</th>
                <th>Fecha Ingreso</th>
              </tr>
            </thead>
            <tbody>
              {paquetes.length > 0 ? paquetes.map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.depto}</td>
                  <td>{p.receptor}</td>
                  <td>{p.destinatario}</td>
                  <td>{p.comentarios}</td>
                  <td>{p.urgencia ? 'Sí' : 'No'}</td>
                  <td>{p.estado}</td>
                  <td>{new Date(p.fecha_ingreso).toLocaleString()}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    No tienes paquetes
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
