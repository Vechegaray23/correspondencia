import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import Home from './pages/Home.jsx';
import Health from './pages/Health.jsx';
import RegisterPaquete from './pages/RegisterPaquete.jsx';

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="health" element={<Health />} />
        <Route path="register" element={<RegisterPaquete />} />
        {/* opcional: ruta comodín */}
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}