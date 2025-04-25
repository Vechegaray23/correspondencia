import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Health from './pages/Health.jsx';
import RegisterPaquete from './pages/RegisterPaquete.jsx';
import NavBar from './components/NavBar.jsx';


export default function App() {
  return (
    <>
     <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
       <div className="container-fluid">
         <Link className="navbar-brand" to="/">
           Correspondencia
         </Link>
         <button
           className="navbar-toggler"
           type="button"
           data-bs-toggle="collapse"
           data-bs-target="#navbarNav"
           aria-controls="navbarNav"
           aria-expanded="false"
           aria-label="Toggle navigation"
         >
           <span className="navbar-toggler-icon"></span>
         </button>
         <div className="collapse navbar-collapse" id="navbarNav">
           <ul className="navbar-nav me-auto mb-2 mb-sm-0">
             <li className="nav-item">
               <Link className="nav-link" to="/">Home</Link>
             </li>
             <li className="nav-item">
               <Link className="nav-link" to="/health">Health Check</Link>
             </li>
             <li className="nav-item">
               <Link className="nav-link" to="/register">Registrar Paquete</Link>
             </li>
           </ul>
         </div>
       </div>
     </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/health" element={<Health />} />
        <Route path="/register" element={<RegisterPaquete />} />
      </Routes>
    </>
  );
}