import React, { useRef, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { CartContext } from "../components/cart/CartContext";
import "./PlanDetail.css";
import clientAxios from "../helpers/axios.config.helper";


const planInfo = {
  "primeros-pasos": {
    nombre: "Primeros Pasos",
    edad: "0 - 5 años",
    beneficios: [
      "Consultas veterinarias mensuales sin cargo",
      "Vacunación anual obligatoria (incluye antirrábica y vacunas múltiples)",
      "Desparasitación interna y externa trimestral",
      "Control de crecimiento y nutrición personalizada",
      "Consulta con etólogo (comportamiento) inicial",
      "Cobertura en urgencias por accidentes",
      "Orientación para adiestramiento básico",
      "Kit de bienvenida (placa, cepillo, snacks saludables)",
    ],
  },
  madurando: {
    nombre: "Madurando",
    edad: "5 - 10 años",
    beneficios: [
      "Consultas veterinarias cada 2 meses",
      "Refuerzos vacunales y chequeo anual general",
      "Análisis de sangre anual preventivo",
      "Desparasitación semestral",
      "Limpieza dental anual",
      "Cobertura ampliada en urgencias y cirugías programadas",
      "Sesiones de control de peso y movilidad",
      "Revisión de conducta y asesoramiento en cambios de hábitos",
    ],
  },
  adultos: {
    nombre: "Adultos",
    edad: "Más de 10 años",
    beneficios: [
      "Consultas veterinarias ilimitadas",
      "Chequeo geriátrico semestral completo (cardíaco, renal, articular)",
      "Descuentos en medicación crónica y suplementos",
      "Limpieza dental + revisión bucal completa anual",
      "Fisioterapia o acupuntura opcional (1 sesión mensual incluida)",
      "Asesoramiento en cuidados paliativos y bienestar emocional",
      "Cobertura completa en emergencias y hospitalización",
      "Traslados a domicilio en caso de urgencias",
    ],
  },
};

const precios = {
  "primeros-pasos": 8000,
  madurando: 12000,
  adultos: 15000,
};

const PlanDetail = () => {
  const { planId } = useParams();
  const navigate = useNavigate();
  const plan = planInfo[planId];
  const form = useRef();
  const { addToCart } = useContext(CartContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await clientAxios.post("/email/send", data);
      Swal.fire({
        icon: "success",
        title: "Consulta enviada",
        text: "Gracias por tu interés. Pronto nos contactaremos contigo.",
        confirmButtonColor: "#00bcd4",
      });
      form.current.reset();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al enviar tu consulta. Inténtalo más tarde.",
        confirmButtonColor: "#d33",
      });
    }
  };

  if (!plan) {
    return (
      <Container className="py-5 text-center">
        <h2>Plan no encontrado</h2>
        <p>Verifica el enlace o vuelve al inicio.</p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <Card className="shadow plan-detail-card">
            <Card.Body>
              <h2 className="mb-3 text-center plan-title">
                <span className="plan-title-word">Plan:</span> {plan.nombre}
              </h2>
              <p className="text-center text-muted mb-4">
                Edad recomendada: {plan.edad}
              </p>
              <ul className="mb-4">
                {plan.beneficios.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>

              <Form ref={form} onSubmit={handleSubmit}>
                <input type="hidden" name="plan" value={plan.nombre} />
                <Form.Group className="mb-3">
                  <Form.Label>Nombre completo</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    placeholder="Ej: Juan Pérez"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Ej: tu@email.com"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formTelefono">
                  <Form.Label>Número de contacto</Form.Label>
                  <Form.Control
                    type="tel"
                    name="telefono"
                    placeholder="Ej: +54 9 11 1234 5678"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Mensaje adicional (opcional)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="mensaje"
                    placeholder="¿Querés comentarnos algo más?"
                  />
                </Form.Group>

                <div className="d-flex justify-content-center gap-2 mt-3 flex-wrap">
                  <Button
                    className="cart-button"
                    onClick={() => {
                      const token = sessionStorage.getItem("token");

                      if (!token) {
                        Swal.fire({
                          icon: "info",
                          title: "Debes estar registrado/a",
                          text: "Inicia sesión o regístrate para agregar un plan al carrito.",
                          showCancelButton: true,
                          confirmButtonText: "Registrarse",
                          cancelButtonText: "Iniciar Sesión",
                          confirmButtonColor: "#00bcd4",
                          cancelButtonColor: "#FEC107",
                          customClass: {
                            cancelButton: "swal2-login-button",
                          },
                        }).then((result) => {
                          if (result.isConfirmed) {
                            navigate("/register");
                          } else if (
                            result.dismiss === Swal.DismissReason.cancel
                          ) {
                            navigate("/login");
                          }
                        });
                        return;
                      }

                      const planData = {
                        id: planId,
                        nombre: plan.nombre,
                        descripcion: `Plan para edad ${plan.edad}`,
                        precio: precios[planId] || 0,
                      };

                      addToCart(planData);

                      Swal.fire({
                        icon: "success",
                        title: "Agregado al carrito",
                        text: `El plan "${plan.nombre}" fue agregado al carrito.`,
                        confirmButtonColor: "#00bcd4",
                      }).then(() => {
                        navigate("/user/cart");
                      });
                    }}
                  >
                    Agregar al carrito
                  </Button>

                  <Button type="submit" className="plan-button">
                    Enviar consulta
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PlanDetail;
