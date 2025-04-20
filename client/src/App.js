import { useEffect, useState } from 'react';

function App() {
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/health')
      .then((r) => r.json())
      .then((json) => setStatus(json.status))
      .catch(() => setStatus('error'));
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Health‑Check</h1>
      <p>Backend status: <strong>{status}</strong></p>
    </div>
  );
}

export default App;
