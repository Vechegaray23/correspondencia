// client/src/pages/PaquetesCustodia.jsx
import React, { useState, useEffect } from 'react'
import ConserjeNavbar from '../components/ConserjeNavbar.jsx'

export default function PaquetesCustodia() {
  const [paquetes, setPaquetes] = useState([])
  const [error, setError]       = useState('')

  const API = import.meta.env.VITE_API_URL + '/api/v1/paquetes'

  const fetchPaquetes = async () => {
    try {
      const res  = await fetch(API)
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setPaquetes(data)
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => {
    fetchPaquetes()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este paquete?')) return
    try {
      const res = await fetch(`${API}/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Error al eliminar paquete')
      fetchPaquetes()
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <>
      <ConserjeNavbar />

      <section className="intro">
        <div className="bg-image h-100" style={{ backgroundColor: '#6095F0' }}>
          <div className="mask d-flex align-items-center h-100">
            <div className="container">
              <h2 className="mb-4 text-white">Paquetes en Custodia</h2>
              {error && <div className="alert alert-danger">{error}</div>}

              <div className="card shadow-2-strong" style={{ backgroundColor: '#f5f7fa' }}>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-borderless mb-0">
                      <thead>
                        <tr>
                          <th scope="col"><input type="checkbox" /></th>
                          <th scope="col">ID</th>
                          <th scope="col">DEPTO</th>
                          <th scope="col">RECEPTOR</th>
                          <th scope="col">DESTINATARIO</th>
                          <th scope="col">COMENTARIOS</th>
                          <th scope="col">URGENCIA</th>
                          <th scope="col">FECHA INGRESO</th>
                          <th scope="col">ESTADO</th>
                          <th scope="col">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paquetes.length > 0 ? paquetes.map(pkg => (
                          <tr key={pkg.id}>
                            <th scope="row">
                              <input className="form-check-input" type="checkbox" />
                            </th>
                            <td>{pkg.id}</td>
                            <td>{pkg.depto}</td>
                            <td>{pkg.receptor}</td>
                            <td>{pkg.destinatario}</td>
                            <td>{pkg.comentarios}</td>
                            <td>{pkg.urgencia ? 'Sí' : 'No'}</td>
                            <td>{new Date(pkg.fecha_ingreso).toLocaleString()}</td>
                            <td>{pkg.estado}</td>
                            <td>
                              <button
                                className="btn btn-danger btn-sm px-3"
                                onClick={() => handleDelete(pkg.id)}
                              >
                                <i className="fas fa-times" />
                              </button>
                            </td>
                          </tr>
                        )) : (
                          <tr>
                            <td colSpan="10" className="text-center py-4">
                              No hay paquetes en custodia.
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
  )
}