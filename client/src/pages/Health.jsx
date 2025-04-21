import { useEffect, useState } from 'react';

export default function Health() {
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    fetch('https://correspondencia-production-c826.up.railway.app/api/v1/health')
      .then(r => r.json())
      .then(json => setStatus(json.status))
      .catch(() => setStatus('error'));
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Health Check</h1>
      <p>Estado del backend: <strong>{status}</strong></p>
    </div>
  );
}
