import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (

    <>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <h1 className="display-4 mb-3">Bienvenido a MiSitio</h1>
          <p className="lead mb-4">
            La plataforma integral para gestionar tus paquetes de forma rápida y segura.
          </p>
          <Link to="/login" className="btn btn-login btn-lg">
            Iniciar sesión
          </Link>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-5">
        <div className="container">
          <div className="row text-center gy-4">
            <div className="col-md-4">
              <div className="feature-icon mx-auto">
                <i className="bi bi-speedometer2" />
              </div>
              <h5 className="fw-bold">Rápido</h5>
              <p>Procesa tus envíos en segundos con nuestra interfaz optimizada.</p>
            </div>
            <div className="col-md-4">
              <div className="feature-icon mx-auto">
                <i className="bi bi-shield-lock" />
              </div>
              <h5 className="fw-bold">Seguro</h5>
              <p>Protegemos tus datos con los más altos estándares de seguridad.</p>
            </div>
            <div className="col-md-4">
              <div className="feature-icon mx-auto">
                <i className="bi bi-phone" />
              </div>
              <h5 className="fw-bold">Móvil</h5>
              <p>Accede a la plataforma desde cualquier dispositivo, en cualquier lugar.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="workflow" className="py-5">
        <div className="container">
          <h2 className="text-center mb-5" style={{ color: 'var(--bs-primary)' }}>
            Cómo funciona
          </h2>
          <div className="row gy-4">
            <div className="col-md-4">
              <div className="info-block h-100 text-center">
                <i
                  className="bi bi-camera-reels"
                  style={{ fontSize: '2rem', color: 'var(--bs-primary)' }}
                />
                <h5 className="mt-3">Escanea</h5>
                <p>Usa la cámara o lector QR integrado para registrar cada paquete al instante.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="info-block h-100 text-center">
                <i className="bi bi-box" style={{ fontSize: '2rem', color: 'var(--bs-primary)' }} />
                <h5 className="mt-3">Gestiona</h5>
                <p>Monitorea el estado de todos tus envíos en un tablero unificado y claro.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="info-block h-100 text-center">
                <i
                  className="bi bi-rocket-takeoff"
                  style={{ fontSize: '2rem', color: 'var(--bs-primary)' }}
                />
                <h5 className="mt-3">Entrega</h5>
                <p>Confirma la entrega y genera notificaciones automáticas para tus clientes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-5 pb-4">
        <div className="container">
          <div className="row gy-4">
            <div className="col-md-4">
              <h6 className="section-header">Sobre nosotros</h6>
              <p>
                MiSitio es una startup chilena dedicada a simplificar la logística de última milla
                mediante soluciones digitales intuitivas.
              </p>
            </div>
            <div className="col-md-4">
              <h6 className="section-header">Enlaces rápidos</h6>
              <ul className="list-unstyled mb-0">
                <li>
                  <a href="#features">Características</a>
                </li>
                <li>
                  <a href="#workflow">Cómo funciona</a>
                </li>
                <li>
                  <Link to="/login">Iniciar sesión</Link>
                </li>
                <li>
                  <a href="#">Política de privacidad</a>
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <h6 className="section-header">Contacto</h6>
              <p className="mb-1">
                <i className="bi bi-envelope me-2" />
                soporte@misitio.cl
              </p>
              <p className="mb-1">
                <i className="bi bi-telephone me-2" />
                +56 2 2345 6789
              </p>
              <p>
                <i className="bi bi-geo-alt me-2" />
                Santiago, Chile
              </p>
            </div>
          </div>
          <hr className="my-4" />
          <div className="d-flex justify-content-between flex-column flex-md-row text-center">
            <small>&copy; 2025 MiSitio. Todos los derechos reservados.</small>
            <div>
              <a className="me-3" href="#">
                <i className="bi bi-twitter" />
              </a>
              <a className="me-3" href="#">
                <i className="bi bi-facebook" />
              </a>
              <a href="#">
                <i className="bi bi-linkedin" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}