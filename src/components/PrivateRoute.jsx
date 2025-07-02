import { useNavigate, Navigate } from "react-router-dom";

const PrivateRoute = ({ children, rol }) => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const rolUsuario = sessionStorage.getItem("rol")?.replace(/"/g, "");

  const rutasAdminProtegidas = ["/admin", "/admin/patients", "/admin/shifts"];

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (rol === rolUsuario) {
    return children;
  }

  if (
    rolUsuario === "usuario" &&
    rutasAdminProtegidas.includes(location.pathname)
  ) {
    return <Navigate to="/user" />;
  }

  return children;
};

export default PrivateRoute;
