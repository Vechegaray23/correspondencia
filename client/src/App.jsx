import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container } from 'react-bootstrap';

export default function NavBar() {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm mb-4">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Mi App</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/health">
              <Nav.Link>Health Check</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/register">
              <Nav.Link>Registrar Paquete</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}