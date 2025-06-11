import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPaquete() {
  const [depto, setDepto] = useState('');
  const [receptor, setReceptor] = useState('');
  const [destinatario, setDestinatario] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [urgencia, setUrgencia] = useState(false);
  const [error, setError] = useState('');
  const [qr, setQr] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + '/api/v1/paquetes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          depto,
          receptor,
          destinatario,
          comentarios,
          urgencia,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || res.statusText);
      setQr(data.qr);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="container py-5">
      <h2 className="text-center section-title mb-2">Registrar Paquete</h2>
      <p className="text-center section-sub mb-4">
        Completa los datos del paquete para su seguimiento.
      </p>

      <div className="card bg-white mx-auto" style={{ maxWidth: '900px' }}>
        <div className="card-body">
          <h4 className="text-center mb-4">Datos del Paquete</h4>
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="dept" className="form-label required fw-semibold">
                  Número Departamento
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="dept"
                  placeholder="Ej: 101A"
                  value={depto}
                  onChange={(e) => setDepto(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="receiver" className="form-label required fw-semibold">
                  Nombre quien recibe
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="receiver"
                  placeholder="Ej: Juan Pérez"
                  value={receptor}
                  onChange={(e) => setReceptor(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="dest" className="form-label required fw-semibold">
                  Nombre destinatario
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="dest"
                  placeholder="Ej: María Gómez"
                  value={destinatario}
                  onChange={(e) => setDestinatario(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="comments" className="form-label fw-semibold">
                  Comentarios
                </label>
                <textarea
                  className="form-control"
                  id="comments"
                  rows="3"
                  placeholder="Observaciones (opcional)"
                  value={comentarios}
                  onChange={(e) => setComentarios(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-4">
              <h5 className="text-center mb-2">Urgencia</h5>
              <div className="form-check d-flex justify-content-center">
                <input
                  className="form-check-input me-2"
                  type="checkbox"
                  id="urgent"
                  checked={urgencia}
                  onChange={(e) => setUrgencia(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="urgent">
                  Marcar como urgente
                </label>
              </div>
            </div>

            <div className="d-grid mt-4">
              <button type="submit" className="btn btn-primary btn-lg">
                Registrar Paquete
              </button>
            </div>
          </form>
          {qr && (
            <div className="text-center my-3">
              <p>Código QR generado:</p>
              <img src={qr} alt="QR del paquete" />
              <button
                type="button"
                className="btn btn-secondary mt-3"
                onClick={() => navigate('/dashboard/conserje/custodia')}
              >
                Ir a Custodia
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
