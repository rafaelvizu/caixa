import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <FaHome /> Caixa
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </Nav.Link>
            <Nav.Link href="#pricing">
              <Link to="/produtos" className="nav-link">
                Produtos
              </Link>
            </Nav.Link>
            <Nav.Link href="#pricing">
              <Link to="/vendas" className="nav-link">
                Vendas
              </Link>
            </Nav.Link>
            <Nav.Link href="#pricing">
              <Link to="/vendas-cadastro" className="nav-link">
                Nova venda
              </Link>
            </Nav.Link>
          </Nav>
          <Nav>
       
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
