import { useState } from "react";
import { Form, Button, Container, Card, InputGroup } from "react-bootstrap";
import Swal from "sweetalert2";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import clientAxios from "../helpers/axios.config.helper";
import "./Register.css";

const Register = () => {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    aceptaTerminos: false,
  });

  const [errors, setErrors] = useState({
    nombre: "",
    email: "",
    password: "",
    aceptaTerminos: "",
  });

  const validate = () => {
    let valid = true;
    const newErrors = {
      nombre: "",
      email: "",
      password: "",
      aceptaTerminos: "",
    };

    if (!form.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
      valid = false;
    }

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

    if (!form.aceptaTerminos) {
      newErrors.aceptaTerminos = "Debes aceptar los términos y condiciones";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await clientAxios.post("/auth/register", form);

      Swal.fire("Registro exitoso", "Ya podés iniciar sesión", "success");
      setForm({ nombre: "", email: "", password: "", aceptaTerminos: false });
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.msg || "No se pudo completar el registro",
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
            Crear cuenta
          </Card.Title>
          <Form onSubmit={handleSubmit} noValidate>
            <Form.Group className="mb-3">
              <Form.Label>Nombre completo</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaUser />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  isInvalid={!!errors.nombre}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.nombre}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

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

            <Form.Group className="mb-3">
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

            <Form.Group className="mb-4">
              <Form.Check
                type="checkbox"
                name="aceptaTerminos"
                label={
                  <>
                    Acepto los{" "}
                    <a href="*" target="_blank" rel="noopener noreferrer">
                      términos y condiciones
                    </a>
                  </>
                }
                checked={form.aceptaTerminos}
                onChange={handleChange}
                isInvalid={!!errors.aceptaTerminos}
                feedback={errors.aceptaTerminos}
                feedbackType="invalid"
              />
            </Form.Group>

            <Button variant="info" type="submit" className="btn-personalizado">
              Registrarme
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;
