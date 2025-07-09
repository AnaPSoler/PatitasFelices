import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Card, InputGroup } from "react-bootstrap";
import Swal from "sweetalert2";
import { FaEnvelope, FaLock } from "react-icons/fa";
import clientAxios from "../helpers/axios.config.helper"; 
import "./Login.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const validate = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      newErrors.email = "Debes ingresar un correo electrónico válido";
      valid = false;
    }

    const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(form.password)) {
      newErrors.password =
        "La contraseña debe tener al menos 8 caracteres y una mayúscula";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await clientAxios.post("/auth/login", form);

      const { token, user } = response.data;

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("rol", user.rol);

      await Swal.fire("Bienvenido", "Has iniciado sesión con éxito", "success");

      if (user.rol === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.msg || "Credenciales incorrectas",
        "error"
      );
    }
  };

  return (
    <Container className="form-container d-flex align-items-center justify-content-center">
      <Card className="form-card animate_animated animate_fadeIn">
        <Card.Body>
          <Card.Title
            className="titulo text-center mb-4"
            style={{ color: "#606060" }}
          >
            Iniciar sesión
          </Card.Title>
          <Form onSubmit={handleSubmit} noValidate>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaEnvelope />
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Contraseña</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaLock />
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Button variant="info" type="submit" className="btn-personalizado">
              Iniciar sesión
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
