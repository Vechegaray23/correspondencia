import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConserjeNavbar from '../components/ConserjeNavbar.jsx';

export default function DashboardConserje() {
  const navigate = useNavigate();
  const [paquetes, setPaquetes] = useState([]);
  const [error, setError] = useState('');

  const API = import.meta.env.VITE_API_URL + '/api/v1/paquetes';

  const fetchPaquetes = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setPaquetes(data.filter((pkg) => pkg.estado !== 'entregado'));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchPaquetes();
  }, []);

  const handleEntregar = async (id) => {
    try {
      const res = await fetch(`${API}/${id}/estado`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: 'entregado' }),
      });
      if (!res.ok) throw new Error('Error al cambiar estado');
      fetchPaquetes();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este paquete definitivamente?')) return;
    try {
      const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error al eliminar paquete');
      fetchPaquetes();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <ConserjeNavbar />
      <div className="container py-4">
        {/* KPIs */}
        <div className="row g-4 mb-4">
          <div className="col-md-3">
            <div className="card bg-white">
              <div className="card-body">
                <h6 className="section-header">Ventas Hoy</h6>
                <h2 className="card-title fw-bold">1 245</h2>
                <p className="mb-0 text-muted fs-6">+12 % vs ayer</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-white">
              <div className="card-body">
                <h6 className="section-header">Usuarios Activos</h6>
                <h2 className="card-title fw-bold">3 589</h2>
                <p className="mb-0 text-muted fs-6">+5 % vs semana pasada</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-white">
              <div className="card-body">
                <h6 className="section-header">Conversiones</h6>
                <h2 className="card-title fw-bold">7,8 %</h2>
                <p className="mb-0 text-muted fs-6">-0,2 pp</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-white">
              <div className="card-body">
                <h6 className="section-header">Nuevos Clientes</h6>
                <h2 className="card-title fw-bold">74</h2>
                <p className="mb-0 text-muted fs-6">+9 vs ayer</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabla y Botones */}
        <div className="row g-4">
          {/* Tabla */}
          <div className="col-lg-8">
            <div className="card bg-white h-100">
              <div className="card-body">
                <h6 className="section-header">Paquetes en Custodia</h6>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="table-responsive">
                  <table className="table table-striped table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>ID</th>
                        <th>Depto</th>
                        <th>Receptor</th>
                        <th>Destinatario</th>
                        <th>Comentarios</th>
                        <th>Urgencia</th>
                        <th>Fecha ingreso</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paquetes.length > 0 ? (
                        paquetes.map((pkg) => (
                          <tr key={pkg.id}>
                            <td>{pkg.id}</td>
                            <td>{pkg.depto}</td>
                            <td>{pkg.receptor}</td>
                            <td>{pkg.destinatario}</td>
                            <td>{pkg.comentarios}</td>
                            <td>{pkg.urgencia ? 'Sí' : 'No'}</td>
                            <td>
                              {new Date(pkg.fecha_ingreso).toLocaleString()}
                            </td>
                            <td>
                              <button
                                className="btn btn-success btn-sm me-2"
                                onClick={() => handleEntregar(pkg.id)}
                              >
                                Entregar
                              </button>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDelete(pkg.id)}
                              >
                                <i className="fas fa-times" />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="8" className="text-center py-4">
                            {error ? '—' : 'No hay paquetes en custodia.'}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="col-lg-4">
            <div className="card bg-white h-100 d-flex align-items-center justify-content-center">
              <div className="card-body text-center">
                <h6 className="section-header mb-3">Acciones</h6>
                <div className="d-grid gap-3">
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={() => navigate('/dashboard/conserje/register')}
                  >
                    Registrar paquete
                  </button>
                  <button
                    className="btn btn-success btn-lg"
                    onClick={() => navigate('/dashboard/conserje/entregar')}
                  >
                    Entregar paquete
                  </button>
                  <button className="btn btn-info btn-lg text-white">Slack</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
