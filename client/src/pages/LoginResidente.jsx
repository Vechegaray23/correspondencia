import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginResidente () {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const url = import.meta.env.VITE_API_URL + '/api/v1/auth/login';
      const res = await fetch(url, {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || res.statusText);

      // ↙️  Guardamos token, role y depto
      localStorage.setItem('token',  data.token);
      localStorage.setItem('role',   data.role);
      localStorage.setItem('depto',  data.depto);

      navigate('/dashboard/residente');
    } catch (err) { setError(err.message); }
  };

  /* …  (HTML idéntico; sólo cambió la función handleSubmit) */
}
