import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPaquete() {
  const [depto, setDepto] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/paquetes`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ depto }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || res.statusText);

      setSuccess(true);
      setDepto('');

      // Mantente en la página privada tras el registro
      navigate('/dashboard/conserje/register');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && (
        <div className="alert alert-success">
          Paquete registrado correctamente.
        </div>
      )}
      <div className="mb-3">
        <label className="form-label">Departamento</label>
        <input
          type="text"
          className="form-control"
          value={depto}
          onChange={(e) => setDepto(e.target.value)}
          placeholder="Ej: 101A"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Registrar
      </button>
    </form>
  );
}
