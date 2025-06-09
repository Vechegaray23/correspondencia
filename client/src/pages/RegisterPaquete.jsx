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
    <div className="container-fluid px-1 py-5 mx-auto bg-primary bg-opacity-25">
      <div className="row d-flex justify-content-center">
        <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center bg-light">
          <h3>Registrar Paquete</h3>
          <p className="blue-text">Completa los datos del paquete para su seguimiento.</p>
          <div className="card">
            <h5 className="text-center mb-4">Datos del Paquete</h5>
            {error && <div className="alert alert-danger">{error}</div>}
            <form noValidate className="form-card" onSubmit={handleSubmit}>
              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Número Departamento<span className="text-danger"> *</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ej: 101A"
                    value={depto}
                    onChange={(e) => setDepto(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Nombre quien recibe<span className="text-danger"> *</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ej: Juan Pérez"
                    value={receptor}
                    onChange={(e) => setReceptor(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Nombre destinatario<span className="text-danger"> *</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ej: María Gómez"
                    value={destinatario}
                    onChange={(e) => setDestinatario(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">Comentarios</label>
                  <textarea
                    className="form-control"
                    placeholder="Observaciones (opcional)"
                    value={comentarios}
                    onChange={(e) => setComentarios(e.target.value)}
                    rows="3"
                  />
                </div>
              </div>

              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">Urgencia</label>
                  <div className="form-check mt-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={urgencia}
                      onChange={(e) => setUrgencia(e.target.checked)}
                      id="urgenciaCheck"
                    />
                    <label className="form-check-label" htmlFor="urgenciaCheck">
                      Marcar como urgente
                    </label>
                  </div>
                </div>
              </div>

              <div className="row justify-content-end">
                <div className="form-group col-sm-6">
                  <button type="submit" className="btn btn-primary btn-block">
                    Registrar Paquete
                  </button>
                </div>
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
      </div>
    </div>
  );
}
