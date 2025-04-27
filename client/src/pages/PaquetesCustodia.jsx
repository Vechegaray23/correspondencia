import React, { useState, useEffect } from 'react';
import ConserjeNavbar from '../components/ConserjeNavbar.jsx';

export default function PaquetesCustodia() {
  const [paquetes, setPaquetes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(
      import.meta.env.VITE_API_URL + '/api/v1/paquetes'
    )
      .then(res => res.json())
      .then(data => {
        if (data.error) throw new Error(data.error);
        setPaquetes(data);
      })
      .catch(err => setError(err.message));
  }, []);

  return (
    <>
      <ConserjeNavbar />
      <section className="intro">
        <div
          className="bg-image h-100"
          style={{ backgroundColor: '#6095F0' }}
        >
          <div className="mask d-flex align-items-center h-100">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12">
                  <div
                    className="card shadow-2-strong"
                    style={{ backgroundColor: '#f5f7fa' }}
                  >
                    <div className="card-body">
                      {error && (
                        <div className="alert alert-danger">{error}</div>
                      )}
                      <div className="table-responsive">
                        <table className="table table-borderless mb-0">
                          <thead>
                            <tr>
                              <th scope="col">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </th>
                              <th scope="col">ID</th>
                              <th scope="col">DEPTO</th>
                              <th scope="col">FECHA INGRESO</th>
                              <th scope="col">ESTADO</th>
                              <th scope="col">Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {paquetes.map(pkg => (
                              <tr key={pkg.id}>
                                <th scope="row">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                    />
                                  </div>
                                </th>
                                <td>{pkg.id}</td>
                                <td>{pkg.depto}</td>
                                <td>
                                  {new Date(pkg.fecha_ingreso).toLocaleDateString()}
                                </td>
                                <td>{pkg.estado}</td>
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-danger btn-sm px-3"
                                    onClick={() => {
                                      // TODO: implementar cierre/envío a backend
                                      alert(
                                        'Marcar paquete ' +
                                          pkg.id +
                                          ' como entregado'
                                      );
                                    }}
                                  >
                                    <i className="fas fa-times" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
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
