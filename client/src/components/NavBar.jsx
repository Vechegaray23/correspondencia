import React from 'react';
import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function NavBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="sm" className="mb-4">
      <Container fluid>
        <LinkContainer to="/">
          <Navbar.Brand>Correspondencia</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="mynavbar" />
        <Navbar.Collapse id="mynavbar">
          <Nav className="me-auto">
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