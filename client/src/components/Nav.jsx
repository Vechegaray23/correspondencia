import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
      <Link to="/health">Health Check</Link>
    </nav>
  );
}
