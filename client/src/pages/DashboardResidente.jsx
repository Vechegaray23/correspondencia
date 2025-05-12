import React, { useEffect, useState } from 'react';
import ResidenteNavbar from '../components/ResidenteNavbar.jsx';

export default function DashboardResidente () {
  const [paquetes, setPaquetes] = useState([]);
  const [error,    setError]    = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const depto = localStorage.getItem('depto');   // 👈 tomado del login

    if (!token || !depto) return;

    fetch(`${import.meta.env.VITE_API_URL}/api/v1/paquetes?depto=${depto}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(data => {
        if (data.error) throw new Error(data.error);
        setPaquetes(data);
      })
      .catch(err => setError(err.message));
  }, []);

  return (
    <>
      <ResidenteNavbar />
      <div className="container mt-4">
        <h3>Mis paquetes (Depto {localStorage.getItem('depto')})</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        {!paquetes.length && !error && <p>No hay paquetes.</p>}
        {paquetes.length > 0 && (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th><th>Receptor</th><th>Comentarios</th>
                <th>Urgencia</th><th>Estado</th><th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {paquetes.map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.receptor}</td>
                  <td>{p.comentarios ?? '-'}</td>
                  <td>{p.urgencia ? 'Sí' : 'No'}</td>
                  <td>{p.estado}</td>
                  <td>{new Date(p.fecha_ingreso).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
