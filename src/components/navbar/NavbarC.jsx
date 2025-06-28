import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../../assets/logo.png";
import "./NavbarC.css";
import { NavLink, useNavigate} from "react-router";

const NavbarC = () => {  

  const navigate = useNavigate();
  const usuarioLogeado = JSON.parse(sessionStorage.getItem("token"));
  const usuarioRolLogeado = JSON.parse(sessionStorage.getItem("rol"));

  const cerrarSesion = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("rol");
    setTimeout(() => {
      navigate("/");
    }, 100);
  };

  return (
    <>
      <Navbar bg="white" variant="light" expand="lg" className="py-3 shadow-sm">
        <Container fluid>
          <NavLink
            to={
              usuarioLogeado && usuarioRolLogeado === "usuario"
                ? "/user"
                : usuarioLogeado && usuarioRolLogeado === "admin"
                ? "/admin"
                : "/"
            }
          >
            <img
              src={logo}
              height="75"
              className="logo-brand d-inline-block align-top"
              alt="Logo Patitas Felices"
            />
          </NavLink>

          <Navbar.Toggle aria-controls="auth-navbar" />
          <Navbar.Collapse id="auth-navbar" className="gap-3">
            {usuarioLogeado && usuarioRolLogeado === "usuario" ? (
              <Nav className="ms-auto">
                <NavLink className="auth-link" to="/user">
                  Inicio
                </NavLink>
                <NavLink className="auth-link" to="/user/plans">
                  Planes
                </NavLink>
                <NavLink className="auth-link" to="/user/shifts">
                  Turnos
                </NavLink>
                <NavLink className="auth-link" to="/user/cart">
                  Carrito
                </NavLink>
              </Nav>
            ) : usuarioLogeado && usuarioRolLogeado === "admin" ? (
              <Nav className="ms-auto">
                <NavLink className="auth-link" to="/admin">
                  Inicio
                </NavLink>
                <NavLink className="auth-link" to="/admin/patients">
                  Pacientes
                </NavLink>
                <NavLink className="auth-link" to="/admin/shifts">
                  Turnos
                </NavLink>
              </Nav>
            ) : (
              <Nav className="ms-auto">
                <NavLink className="auth-link" to="/">
                  Inicio
                </NavLink>
                <NavLink className="auth-link" to="/aboutUs">
                  Sobre Nosotros
                </NavLink>
                <NavLink className="auth-link" to="/contact">
                  Contacto
                </NavLink>
              </Nav>
            )}
            {usuarioLogeado ? (
              <Nav className="ms-auto">
                <NavLink className="auth-link" to="#" onClick={logoutUser}>
                  Cerrar Sesion
                </NavLink>
              </Nav>
            ) : (
              <Nav className="ms-auto">
                <NavLink className="auth-link" to="/login">
                  Iniciar Sesion
                </NavLink>
                <NavLink className="auth-link" to="/register">
                  Registrarse
                </NavLink>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarC

