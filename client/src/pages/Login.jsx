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
    <section className="container-fluid px-0" style={{ backgroundColor: '', minHeight: '100vh' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                {/* Izquierda: formulario */}
                <div className="col-lg-6" style={{ backgroundColor: 'White' }}>
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <img src="/box.png" style={{ width: '150px' }} alt="logo" />
                    </div>

                    <div className="text-center">
                      <h4 className="mt-1 mb-5 pb-1">Bienvenido</h4>
                    </div>

                    {error && <div className="alert alert-danger">{error}</div>}

                    <form onSubmit={handleSubmit}>
                      <p>Ingrese sus credenciales.</p>

                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="user"
                          className="form-control"
                          placeholder="Usuario"
                          value={username}
                          onChange={e => setUsername(e.target.value)}
                          required
                        />
                        <label className="form-label" htmlFor="user">
                          Usuario
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="pass"
                          className="form-control"
                          placeholder="Contraseña"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          required
                        />
                        <label className="form-label" htmlFor="pass">
                          Contraseña
                        </label>
                      </div>

                      <div className="text-center pt-1 mb-5 pb-1">
                        <button
                          type="submit"
                          className="btn text-white btn-block fa-lg mb-3"
                          style={{ backgroundColor: 'RoyalBlue' }}
                        >
                          Ingresar
                        </button>
                      </div>

                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">¿No tienes cuenta?</p>
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => navigate('/')}
                        >
                          Crear cuenta
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Derecha: imagen y texto */}
                <div className="col-lg-6 d-flex align-items-center" style={{ backgroundColor: 'WhiteSmoke' }}>
                  <img src="/delivery_guy.png" style={{ width: '185px' }} alt="logo" />
                  <div className="px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4">Tu correspondencia siempre a tiempo</h4>
                    <p className="small mb-0">
                      Accede a tu panel para gestionar correspondencia.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}