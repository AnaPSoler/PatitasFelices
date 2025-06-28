import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../../assets/logo.png";
import "./NavbarC.css";
import { NavLink, useNavigate } from "react-router";

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
          <Navbar.Collapse
            id="auth-navbar"
            className="gap-3 justify-content-end"
          >
            {!usuarioLogeado && (
              <Nav className="me-auto">
                <NavLink
                  end
                  className={({ isActive }) =>
                    `auth-link ${isActive ? "active" : ""}`
                  }
                  to="/"
                >
                  Inicio
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    `auth-link ${isActive ? "active" : ""}`
                  }
                  to="/aboutUs"
                >
                  Sobre Nosotros
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    `auth-link ${isActive ? "active" : ""}`
                  }
                  to="/contact"
                >
                  Contáctanos
                </NavLink>
              </Nav>
            )}

            {usuarioLogeado && usuarioRolLogeado === "usuario" && (
              <Nav className="me-auto">
                <NavLink
                  end
                  className={({ isActive }) =>
                    `auth-link ${isActive ? "active" : ""}`
                  }
                  to="/user"
                >
                  Inicio
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    `auth-link ${isActive ? "active" : ""}`
                  }
                  to="/user/plans"
                >
                  Planes
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    `auth-link ${isActive ? "active" : ""}`
                  }
                  to="/user/shifts"
                >
                  Turnos
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    `auth-link ${isActive ? "active" : ""}`
                  }
                  to="/user/cart"
                >
                  Carrito
                </NavLink>
              </Nav>
            )}

            {usuarioLogeado && usuarioRolLogeado === "admin" && (
              <Nav className="me-auto">
                <NavLink
                  end
                  className={({ isActive }) =>
                    `auth-link ${isActive ? "active" : ""}`
                  }
                  to="/admin"
                >
                  Inicio
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    `auth-link ${isActive ? "active" : ""}`
                  }
                  to="/admin/patients"
                >
                  Pacientes
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    `auth-link ${isActive ? "active" : ""}`
                  }
                  to="/admin/shifts"
                >
                  Turnos
                </NavLink>
              </Nav>
            )}

            {usuarioLogeado ? (
              <Nav>
                <span
                  className="auth-link cerrar-sesion"
                  onClick={cerrarSesion}
                >
                  Cerrar sesión
                </span>
              </Nav>
            ) : (
              <Nav>
                <NavLink
                  className={({ isActive }) =>
                    `auth-link ${isActive ? "active" : ""}`
                  }
                  to="/login"
                >
                  Iniciar sesión
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    `auth-link ${isActive ? "active" : ""}`
                  }
                  to="/register"
                >
                  Registrarse
                </NavLink>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarC;
