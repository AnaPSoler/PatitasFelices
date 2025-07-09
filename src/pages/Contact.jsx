import { useState } from "react";
import { Form, Button, Container, Card, InputGroup } from "react-bootstrap";
import Swal from "sweetalert2";
import { FaUser, FaEnvelope, FaCommentDots } from "react-icons/fa";
import clientAxios from "../helpers/axios.config.helper";
import "./Contact.css";

const Contact = () => {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    consulta: "",
  });

  const [errors, setErrors] = useState({
    nombre: "",
    email: "",
    consulta: "",
  });

  const validate = () => {
    let valid = true;
    const newErrors = { nombre: "", email: "", consulta: "" };

    if (!form.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
      valid = false;
    } else if (form.nombre.trim().length < 3) {
      newErrors.nombre = "Debe tener al menos 3 caracteres";
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      newErrors.email = "Debes ingresar un correo electrónico válido";
      valid = false;
    }

    if (!form.consulta.trim()) {
      newErrors.consulta = "La consulta no puede estar vacía";
      valid = false;
    } else if (form.consulta.trim().length < 10) {
      newErrors.consulta = "La consulta debe tener al menos 10 caracteres";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await clientAxios.post("/contact", form);

      await Swal.fire(
        "¡Consulta enviada!",
        "Gracias por contactarnos. Te responderemos pronto.",
        "success"
      );

      setForm({ nombre: "", email: "", consulta: "" });
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.msg || "No se pudo enviar la consulta",
        "error"
      );
    }
  };

  return (
    <Container className="contact-container d-flex align-items-center justify-content-center py-5">
      <Card className="contact-card animate_animated animate_fadeIn">
        <Card.Body>
          <h2 className="contact-titulo text-center mb-4 fw-semibold">
            Contáctanos
          </h2>
          <Form onSubmit={handleSubmit} noValidate>
            <Form.Group className="mb-3" controlId="nombre">
              <Form.Label>Nombre y Apellido</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaUser />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="nombre"
                  placeholder="Tu nombre completo"
                  value={form.nombre}
                  onChange={handleChange}
                  isInvalid={!!errors.nombre}
                  maxLength={100}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.nombre}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaEnvelope />
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="tu@email.com"
                  value={form.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                  maxLength={150}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-4" controlId="consulta">
              <Form.Label>Consulta</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaCommentDots />
                </InputGroup.Text>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="consulta"
                  placeholder="Escribe aquí tu consulta"
                  value={form.consulta}
                  onChange={handleChange}
                  isInvalid={!!errors.consulta}
                  maxLength={250}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.consulta}
                </Form.Control.Feedback>
              </InputGroup>
              <div className="text-end text-muted small mt-1">
                {form.consulta.length}/250
              </div>
            </Form.Group>

            <div className="text-center">
              <Button variant="info" type="submit" className="btn-contacto">
                Enviar
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Contact;
