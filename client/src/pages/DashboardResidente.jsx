import ResidenteNavbar     from '../components/ResidenteNavbar.jsx';
import PaquetesResidente   from './PaquetesResidente.jsx';

/**
 * El dashboard del residente se limita
 * a mostrar su navbar + la tabla de paquetes.
 */
export default function DashboardResidente() {
  return (
    <>
      <ResidenteNavbar />
      <PaquetesResidente />
    </>
  );
}
