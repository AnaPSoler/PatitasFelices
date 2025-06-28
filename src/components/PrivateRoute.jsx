import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const PrivateRoute = ({ children, rol }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const usuarioLogeado = JSON.parse(sessionStorage.getItem("token")) || null;
  const rolUsuario = JSON.parse(sessionStorage.getItem("rol")) || null;
  const rutasAdminProtegidas = ["/admin", "/admin/patients", "/admin/shifts"];

  useEffect(() => {
    if (!usuarioLogeado) {
      navigate("/");
    } else if (
      rolUsuario === "usuario" &&
      rutasAdminProtegidas.includes(location.pathname)
    ) {
      navigate("/user");
    }
  }, [usuarioLogeado, rolUsuario, location.pathname, navigate]);

  if (!usuarioLogeado) return null;
  if (
    rol === rolUsuario ||
    (rolUsuario === "usuario" &&
      !rutasAdminProtegidas.includes(location.pathname))
  ) {
    return children;
  }

  return null;
};

export default PrivateRoute;
