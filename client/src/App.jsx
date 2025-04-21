import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Health from './pages/Health.jsx';
import RegisterPaquete from './pages/RegisterPaquete.jsx';

export default function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>{' | '}
        <Link to="/health">Health Check</Link>{' | '}
        <Link to="/register">Registrar Paquete</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/health" element={<Health />} />
        <Route path="/register" element={<RegisterPaquete />} />
      </Routes>
    </>
  );
}