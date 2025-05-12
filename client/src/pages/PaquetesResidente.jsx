import React, { useEffect, useState } from 'react';
import ResidenteNavbar from '../components/ResidenteNavbar.jsx';

export default function PaquetesResidente() {
  const [paquetes, setPaquetes] = useState([]);
  const [error,    setError]    = useState('');

  /* 1. depto desde el token */
  const [depto] = useState(() => {
    try {
      const payload = JSON.parse(
        atob(localStorage.getItem('token').split('.')[1])
      );
      return payload.depto || '';
    } catch { return ''; }
  });

  /* 2. fetch filtrado por ?depto= */
  useEffect(() => {
    if (!depto) { setError('Departamento no encontrado'); return; }

    fetch(`${import.meta.env.VITE_API_URL}/api/v1/paquetes?depto=${depto}`)
      .then(r => r.json())
      .then(data => {
        if (data.error) throw new Error(data.error);
        setPaquetes(data);
      })
      .catch(err => setError(err.message));
  }, [depto]);

  /* 3. Render */
  return (
    <>
      <ResidenteNavbar />
      <div className="container mt-4">
        <h3 className="mb-3">Mis paquetes (Depto {depto})</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Receptor</th>
                <th>Comentarios</th>
                <th>Urgencia</th>
                <th>Estado</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {paquetes.map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.receptor}</td>
                  <td>{p.comentarios}</td>
                  <td>{p.urgencia ? 'Sí' : 'No'}</td>
                  <td>{p.estado}</td>
                  <td>{new Date(p.fecha_ingreso).toLocaleDateString()}</td>
                </tr>
              ))}
              {!paquetes.length && !error && (
                <tr>
                  <td colSpan="6" className="text-center">
                    Sin paquetes para mostrar
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
