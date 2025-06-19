import React from "react";
import { Col, Container, Row, Button, Card } from "react-bootstrap";
import "./ServiciosC.css";

const ServiciosC = () => {
  return (
    <>
      <Container className="my-3 text-center">
        <Row className="justify-content-center">
          <Col xs={12} md={12}>
            <h2 className="section-title">
              <span className="section-title-part1">NUESTROS</span>{" "}
              <span className="section-title-part2">SERVICIOS</span>
            </h2>
            <p className="section-description">
              "En Patitas Felices, nos dedicamos con pasión a la salud y el
              bienestar de cada mascota, consolidando 25 años de experiencia al
              servicio de la comunidad. Nuestra filosofía se centra en un
              cuidado integral y compasivo, combinando la más avanzada medicina
              veterinaria con un trato cercano y empático. Nuestra misión:
              asegurar que cada patita que entra por nuestra puerta sea una
              patita feliz y saludable."
            </p>
          </Col>
        </Row>
      </Container>

      <Container className="services-container text-center">
        <Row className="justify-content-center">
          <Col xs={12} sm={6} md={4} className="mb-4">
            <Card className="h-100 service-card">
              <div className="card-icon-container">
                <img
                  src="/img/alimentacion.gif"
                  alt="Icono Alimentación"
                  className="service-icon-img"
                />
              </div>
              <Card.Body>
                <Card.Title className="service-card-title">
                  Alimentación
                </Card.Title>
                <Card.Text className="service-card-description">
                  Proporcionar una dieta balanceada y adecuada para la edad,
                  raza y tamaño de la mascota.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} sm={6} md={4} className="mb-4">
            <Card className="h-100 service-card">
              <div className="card-icon-container">
                <img
                  src="/img/atencion.gif"
                  alt="Icono Atención Veterinaria"
                  className="service-icon-img"
                />
              </div>
              <Card.Body>
                <Card.Title className="service-card-title">
                  Atención veterinaria
                </Card.Title>
                <Card.Text className="service-card-description">
                  Realizar visitas regulares al veterinario para mantener a la
                  mascota saludable.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} sm={6} md={4} className="mb-4">
            <Card className="h-100 service-card">
              <div className="card-icon-container">
                <img
                  src="/img/vacunacion.gif"
                  alt="Icono Vacunación"
                  className="service-icon-img"
                />
              </div>
              <Card.Body>
                <Card.Title className="service-card-title">
                  Vacunación
                </Card.Title>
                <Card.Text className="service-card-description">
                  Vacunar a la mascota contra enfermedades comunes como la
                  rabia, distemper y parvovirus.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Button variant="primary" className="mt-4 service-button">
          Ver todos los servicios
        </Button>
      </Container>
    </>
  );
};

export default ServiciosC;
