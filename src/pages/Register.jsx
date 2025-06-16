import { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";
import "./Register.css"; // 🟢 ahora con el CSS local correcto

const Register = () => {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/register", form);
      Swal.fire("Registro exitoso", "Ya podés iniciar sesión", "success");
      setForm({ nombre: "", email: "", password: "" });
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.msg || "No se pudo registrar",
        "error"
      );
    }
  };

  return (
    <Container className="form-container">
      <Card className="form-card">
        <Card.Body>
          <Card.Title className="titulo text-center">Registro</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre completo</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                required
                maxLength={30}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                maxLength={30}
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
                minLength={6}
              />
            </Form.Group>
            <Button variant="info" type="submit" className="w-100">
              Registrarme
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;
