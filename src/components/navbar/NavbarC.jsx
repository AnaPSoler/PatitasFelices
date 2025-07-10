import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../../assets/logo.png";
import "./NavbarC.css";
import { NavLink, useNavigate } from "react-router-dom";

const NavbarC = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const rol = sessionStorage.getItem("rol")?.replace(/"/g, "");

  const cerrarSesion = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("rol");
    setTimeout(() => {
      navigate("/");
    }, 100);
  };

  return (
    <Navbar bg="white" variant="light" expand="lg" className="py-3 shadow-sm">
      <Container fluid>
        <NavLink
          to={
            token && rol === "usuario"
              ? "/user"
              : token && rol === "admin"
              ? "/admin"
              : "/"
          }
        >
          <img
            src={logo}
            height="75"
            className="logo-brand d-inline-block align-top "
            alt="Logo Patitas Felices"
          />
        </NavLink>

        <Navbar.Toggle aria-controls="auth-navbar" />
        <Navbar.Collapse id="auth-navbar" className="gap-3 justify-content-end">
          {!token && (
            <Nav className="me-auto">
              <NavLink className="auth-link inicio" to="/" end>
                Inicio
              </NavLink>
              <NavLink className="auth-link" to="/aboutUs">
                Sobre Nosotros
              </NavLink>
              <NavLink className="auth-link" to="/contact">
                Contáctanos
              </NavLink>
            </Nav>
          )}

          {token && rol === "usuario" && (
            <Nav className="me-auto">
              <NavLink className="auth-link inicio" to="/user" end>
                Inicio
              </NavLink>
              <NavLink className="auth-link" to="/user/pet">
                Mi Mascota
              </NavLink>
              <NavLink className="auth-link" to="/user/shifts">
                Turnos
              </NavLink>
              <NavLink className="auth-link" to="/user/cart">
                Carrito
              </NavLink>
            </Nav>
          )}

          {token && rol === "admin" && (
            <Nav className="me-auto">
              <NavLink className="auth-link inicio" to="/admin" end>
                Inicio
              </NavLink>
              <NavLink className="auth-link" to="/admin/patients">
                Pacientes
              </NavLink>
              <NavLink className="auth-link" to="/admin/shifts">
                Turnos
              </NavLink>
            </Nav>
          )}

          <Nav>
            {token ? (
              <span className="auth-link cerrar-sesion" onClick={cerrarSesion}>
                Cerrar sesión
              </span>
            ) : (
              <>
                <NavLink className="auth-link" to="/login">
                  Iniciar sesión
                </NavLink>
                <NavLink className="auth-link" to="/register">
                  Registrarse
                </NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarC;
