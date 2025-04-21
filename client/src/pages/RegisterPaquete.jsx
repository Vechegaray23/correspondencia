import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPaquete() {
  const [depto, setDepto] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {  console.log('Calling API at →', import.meta.env.VITE_API_URL + '/api/v1/paquetes');
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const base = import.meta.env.VITE_API_URL;
      //const res = await fetch(`${base}/api/v1/paquetes`, {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/paquetes`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ depto }),
        }
      );
      if (!res.ok) throw new Error('Error al registrar');
      const data = await res.json();
      // Usamos concatenación para evitar backticks
      setSuccess('Paquete (ID: ' + data.id + ') registrado.');
      setDepto('');
      // opcional: descomenta para auto-redirigir
      // setTimeout(function() { navigate('/health'); }, 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Registrar Paquete</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Departamento:
          <input
            type="text"
            value={depto}
            onChange={(e) => setDepto(e.target.value)}
            required
            style={{ margin: '0 0.5rem' }}
          />
        </label>
        <button type="submit">Registrar</button>
      </form>
      {error && <p style={{ color: 'red' }}>❌ {error}</p>}
      {success && <p style={{ color: 'green' }}>✅ {success}</p>}
    </div>
  );
}
