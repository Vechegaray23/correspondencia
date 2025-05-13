import React, { useEffect, useState } from 'react';
import ResidenteNavbar from '../components/ResidenteNavbar.jsx';

/*──────────────── util: leer depto desde el JWT ────────────────*/
function getDeptoFromToken() {
  try {
    const token = localStorage.getItem('token') || '';
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.depto || '';
  } catch {
    return '';
  }
}

export default function PaquetesResidente() {
  const [paquetes, setPaquetes] = useState([]);
  const [error,    setError]    = useState('');
  const depto = getDeptoFromToken();          // ej. "101A"

  /*──────────── fetch filtrado por depto ────────────*/
  useEffect(() => {
    if (!depto) { setError('Departamento no encontrado'); return; }

    const url = `${import.meta.env.VITE_API_URL}/api/v1/paquetes?depto=${depto}`;
    fetch(url)
      .then(r => r.json())
      .then(data => {
        if (data.error) throw new Error(data.error);
        setPaquetes(data);
      })
      .catch(err => setError(err.message));
  }, [depto]);

  /*──────────────────────── render ────────────────────────*/
  return (
    <>
      <ResidenteNavbar />

      <section className="intro">
        <div className="bg-image h-100" style={{ backgroundColor: '#6095F0' }}>
          <div className="mask d-flex align-items-center h-100">
            <div className="container">
              <h2 className="mb-4 text-white">
                Mis paquetes (Depto&nbsp;{depto || '—'})
              </h2>

              {error && <div className="alert alert-danger">{error}</div>}

              <div
                className="card shadow-2-strong"
                style={{ backgroundColor: '#f5f7fa' }}
              >
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-borderless mb-0">
                      <thead>
                        <tr>
                          <th><input type="checkbox" /></th>
                          <th>ID</th>
                          <th>Receptor</th>
                          <th>Destinatario</th>
                          <th>Comentarios</th>
                          <th>Urgencia</th>
                          <th>Fecha ingreso</th>
                          <th>Estado</th>
                        </tr>
                      </thead>

                      <tbody>
                        {paquetes.map(p => (
                          <tr key={p.id}>
                            <td><input className="form-check-input" type="checkbox" /></td>
                            <td>{p.id}</td>
                            <td>{p.receptor}</td>
                            <td>{p.destinatario}</td>
                            <td>{p.comentarios}</td>
                            <td>{p.urgencia ? 'Sí' : 'No'}</td>
                            <td>{new Date(p.fecha_ingreso).toLocaleString()}</td>
                            <td>{p.estado}</td>
                          </tr>
                        ))}

                        {!paquetes.length && !error && (
                          <tr>
                            <td colSpan="8" className="text-center py-4">
                              Sin paquetes para mostrar.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}