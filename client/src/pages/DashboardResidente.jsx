import PaquetesResidente from './PaquetesResidente.jsx';

/**
 * El dashboard del residente solo delega en PaquetesResidente,
 * que ya incluye su propio navbar.
 */
export default function DashboardResidente() {
  return <PaquetesResidente />;
}
