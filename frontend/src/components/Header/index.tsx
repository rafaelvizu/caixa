import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FaHome } from "react-icons/fa";

const Header = () => {
  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <FaHome /> Meu Site
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Recursos</Nav.Link>
            <Nav.Link href="#pricing">Preços</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">Mais detalhes</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Memes
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
