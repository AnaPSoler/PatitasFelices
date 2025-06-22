import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../../assets/logo.png";
import "./NavbarC.css";

const NavbarC = () => {
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "";

  return (
    <Navbar bg="white" variant="light" expand="lg" className="py-3 shadow-sm">
      <Container>
        <Navbar.Brand href="/" className="p-0">
          <img
            src={logo}
            height="75"
            className="logo-brand d-inline-block align-top"
            alt="Logo Patitas Felices"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="auth-navbar" />

        <Navbar.Collapse id="auth-navbar" className="gap-3">
          <Nav className="me-auto gap-3">
            <Nav.Link
              href="/"
              className={`auth-link ${pathname === "/" ? "active-auth" : ""}`}
            >
              Inicio
            </Nav.Link>
            <Nav.Link
              href="/about-us"
              className={`auth-link ${
                pathname === "/about-us" ? "active-auth" : ""
              }`}
            >
              Sobre Nosotros
            </Nav.Link>
            <Nav.Link
              href="/contact"
              className={`auth-link ${
                pathname === "/contact" ? "active-auth" : ""
              }`}
            >
              Contáctanos
            </Nav.Link>         
          </Nav>

          <Nav className="gap-3">
            <Nav.Link
              href="/login"
              className={`auth-link ${
                pathname === "/login" ? "active-auth" : ""
              }`}
            >
              Iniciar sesión
            </Nav.Link>
            <Nav.Link
              href="/register"
              className={`auth-link ${
                pathname === "/register" ? "active-auth" : ""
              }`}
            >
              Registrarse
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarC;

