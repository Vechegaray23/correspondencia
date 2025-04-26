// client/src/pages/LoginConserje.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginConserje() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const url = import.meta.env.VITE_API_URL + '/api/v1/auth/login';
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || res.statusText);

      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      navigate('/dashboard/conserje');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="" style={{ backgroundColor: 'RoyalBlue' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                {/* Lado izquierdo: formulario */}
                <div className="col-lg-6" style={{ backgroundColor: 'White' }} >
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <img
                        src="client/public/delivery_guy.png"
                        style={{ width: '185px' }}
                        alt="logo"
                      />
                      <h4 className="mt-1 mb-5 pb-1">Iniciar Sesión</h4>
                    </div>

                    {error && (
                      <div className="alert alert-danger">
                        {error}
                      </div>
                    )}

                    <form onSubmit={handleSubmit}>
                      <p>Ingrese sus credenciales.</p>

                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="form2Example11"
                          className="form-control"
                          placeholder="Phone number or email address"
                          value={username}
                          onChange={e => setUsername(e.target.value)}
                          required
                        />
                        <label className="form-label" htmlFor="form2Example11">
                          Usuario
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form2Example22"
                          className="form-control"
                          placeholder="Password"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          required
                        />
                        <label className="form-label" htmlFor="form2Example22">
                          Contraseña
                        </label>
                      </div>

                      <div className="text-center pt-1 mb-5 pb-1">
                        <button
                          type="submit"
                          className="btn text-white btn-block fa-lg  mb-3"
                          style={{ backgroundColor: 'Salmon' }}
                        >
                          Log in
                        </button>

                      </div>

                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">No tienes una cuenta?</p>
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

                {/* Lado derecho: contenido estático */}
                <div className="col-lg-6 d-flex align-items-center" style={{ backgroundColor: 'WhiteSmoke' }} >
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4">We are more than just a company</h4>
                    <p className="small mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}