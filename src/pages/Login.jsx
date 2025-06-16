import { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";
import "./Login.css"; // 🟢 nuevo import con estructura correcta

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/login", form);
      Swal.fire("Bienvenido", "Has iniciado sesión con éxito", "success");
      // guardar token, redirigir, etc.
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.msg || "Credenciales incorrectas",
        "error"
      );
    }
  };

  return (
    <Container className="form-container">
      <Card className="form-card">
        <Card.Body>
          <Card.Title className="titulo text-center">Iniciar Sesión</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="info" type="submit" className="w-100">
              Iniciar sesión
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
