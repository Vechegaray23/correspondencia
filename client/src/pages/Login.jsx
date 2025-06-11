import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const navigate = useNavigate()

  async function handleSubmit (e) {
    e.preventDefault()
    setError('')
    try {
      const url = import.meta.env.VITE_API_URL + '/api/v1/auth/login'
      const res = await fetch(url, {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({ username, password })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || res.statusText)

      /* Guardar credenciales limpias */
      localStorage.clear()
      localStorage.setItem('token', data.token)
      localStorage.setItem('role',  data.role)
      if (data.role === 'residente') {
        localStorage.setItem('depto', data.depto || '')
        navigate('/dashboard/residente')
      } else {
        navigate('/dashboard/conserje/custodia')
      }
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <main className="d-flex align-items-center justify-content-center min-vh-100">
      <form onSubmit={handleSubmit} className="card p-4 login-card" style={{ maxWidth: '390px', width: '100%' }}>
        <h2 className="text-center mb-4" style={{ color: 'var(--bs-primary)' }}>Iniciar sesión</h2>
                {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label htmlFor="user" className="form-label fw-semibold">Usuario</label>
          <div className="input-group">
            <span className="input-group-text"><i className="bi bi-person" /></span>
            <input
              type="text"
              id="user"
              className="form-control login-form-control"
              placeholder="usuario"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="pass" className="form-label fw-semibold">Contraseña</label>
          <div className="input-group">
            <span className="input-group-text"><i className="bi bi-lock" /></span>
            <input
              type="password"
              id="pass"
              className="form-control login-form-control"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="remember" />
            <label className="form-check-label small" htmlFor="remember">Recordarme</label>
          </div>
          <a href="#" className="small" style={{ color: 'var(--bs-primary)' }}>¿Olvidaste tu contraseña?</a>
        </div>
        <div className="d-grid mb-3">
          <button className="btn btn-primary btn-lg login-btn-primary" type="submit">Entrar</button>
        </div>
        <div className="text-center position-relative mb-3">
          <span className="bg-white px-2">o</span>
          <hr className="m-0 position-absolute top-50 start-0 w-100" style={{ opacity: '.25' }} />
        </div>
        <div className="d-grid gap-2 mb-3">
          <button type="button" className="btn btn-outline-secondary"><i className="bi bi-google me-2" />Entrar con Google</button>
          <button type="button" className="btn btn-outline-secondary"><i className="bi bi-facebook me-2" />Entrar con Facebook</button>
        </div>

        <p className="text-center small mb-0">
          ¿No tienes cuenta?{' '}
          <a href="#" style={{ color: 'var(--bs-primary)' }}>Regístrate</a>
        </p>
      </form>
    </main>
  )
}