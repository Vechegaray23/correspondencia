import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';

export default function RegisterPaquete() {
  const navigate = useNavigate();
  const [depto, setDepto]       = useState('');
  const [success, setSuccess]   = useState('');
  const [error, setError]       = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/paquetes`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ depto }),
        }
      );
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      setSuccess(`Paquete (ID: ${data.id}) registrado.`);
      setDepto('');
      setTimeout(() => navigate('/health'), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container style={{ maxWidth: '500px' }}>
      <h2 className="mb-4">Registrar Paquete</h2>
      {success && <Alert variant="success">{success}</Alert>}
      {error   && <Alert variant="danger">Error: {error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="depto" className="mb-3">
          <Form.Label>Departamento</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej. 101A"
            value={depto}
            onChange={(e) => setDepto(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Registrar
        </Button>
      </Form>
    </Container>
  );
}