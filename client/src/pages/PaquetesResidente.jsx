// client/src/pages/PaquetesResidente.jsx
import React, { useEffect, useState } from 'react'
import ResidenteNavbar from '../components/ResidenteNavbar.jsx'

/* ────── Tomar depto de localStorage o, en su defecto, del JWT ────── */
function getDepto() {
  const d = localStorage.getItem('depto')
  if (d) return d

  try {
    const token   = localStorage.getItem('token') || ''
    const payload = JSON.parse(atob(token.split('.')[1]))
    const dep     = payload.depto || ''
    if (dep) localStorage.setItem('depto', dep)   // lo guardamos para futuro
    return dep
  } catch {
    return ''
  }
}

export default function PaquetesResidente() {
  const [paquetes, setPaquetes] = useState([])
  const [error,    setError]    = useState('')

  const depto = getDepto()              // «101A», por ejemplo

  /* ──────── Cargar paquetes del residente ──────── */
  useEffect(() => {
    if (!depto) {
      setError('Departamento no definido – inicia sesión de nuevo.')
      return
    }

    const url = `${import.meta.env.VITE_API_URL}/api/v1/paquetes?depto=${encodeURIComponent(depto)}`
    fetch(url)
      .then(r => r.json())
      .then(data => {
        if (data.error) throw new Error(data.error)
        setPaquetes(data.filter(p => p.estado !== 'entregado'))
      })
      .catch(err => setError(err.message))
  }, [depto])

  /* ─────────────── Render ─────────────── */
  return (
    <>
      <ResidenteNavbar />

      <section className="intro">
        <div className="bg-image h-100" style={{ backgroundColor: '#6095F0' }}>
          <div className="mask d-flex align-items-center h-100">
            <div className="container">
              <h2 className="mb-4 text-white">
                Paquetes pendientes – Depto&nbsp;<strong>{depto || '—'}</strong>
              </h2>

              {error && <div className="alert alert-danger">{error}</div>}

              <div className="card shadow-2-strong" style={{ backgroundColor: '#f5f7fa' }}>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-borderless mb-0">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Receptor</th>
                          <th>Comentarios</th>
                          <th>Urgencia</th>
                          <th>Fecha ingreso</th>
                          <th>Estado</th>
                        </tr>
                      </thead>

                      <tbody>
                        {paquetes.length > 0 ? paquetes.map(p => (
                          <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.receptor}</td>
                            <td>{p.comentarios}</td>
                            <td>{p.urgencia ? 'Sí' : 'No'}</td>
                            <td>{new Date(p.fecha_ingreso).toLocaleString()}</td>
                            <td>{p.estado}</td>
                          </tr>
                        )) : (
                          <tr>
                            <td colSpan="6" className="text-center py-4">
                              {error
                                ? '—'
                                : 'No tienes paquetes pendientes.'}
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