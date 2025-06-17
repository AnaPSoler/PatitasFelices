import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./PlanesC.css";

const PlanesC = () => {
  return (
    <Container className="my-5 text-center">
      <h2 className="plans-section-title mb-5">
        <span className="plans-title-part1">PLANES DE SALUD</span>{" "}
        <span className="plans-title-part2">PARA CADA ETAPA</span>
      </h2>
      <Row className="justify-content-center">
        <Col xs={12} sm={6} md={4} className="mb-4">
          <Card className="h-100 plan-card plan-card-1">
            <div className="plan-icon-container">
              <Card.Img
                variant="top"
                src="/img/icono.png"
                alt="Icono Plan Primeros Pasos"
                className="plan-icon-img"
              />
              <Card.Text className="plan-stage-title">PRIMEROS PASOS</Card.Text>
              <Card.Text className="plan-age-range">0 - 5 años</Card.Text>
            </div>
            <Card.Body className="plan-card-body">
              <ul className="plan-features-list">
                <li>Vacunación</li>
                <li>Desparasitación</li>
                <li>Alimentación</li>
                <li>Socialización</li>
                <li>Educación temprana</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4} className="mb-4">
          <Card className="h-100 plan-card plan-card-2">
            <div className="plan-icon-container">
              <Card.Img
                variant="top"
                src="/img/icono.png"
                alt="Icono Plan Madurando"
                className="plan-icon-img"
              />
              <Card.Text className="plan-stage-title">MADURANDO</Card.Text>
              <Card.Text className="plan-age-range">5 a 10 años</Card.Text>
            </div>
            <Card.Body className="plan-card-body">
              <ul className="plan-features-list">
                <li>Vacunación</li>
                <li>Desparasitación</li>
                <li>Alimentación</li>
                <li>Control de peso</li>
                <li>Ejercicio</li>
                <li>Salud dental</li>
                <li>Esterilización/Castración</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4} className="mb-4">
          <Card className="h-100 plan-card plan-card-3">
            <div className="plan-icon-container">
              <Card.Img
                variant="top"
                src="/img/icono.png"
                alt="Icono Plan Adultos"
                className="plan-icon-img"
              />
              <Card.Text className="plan-stage-title">ADULTOS</Card.Text>
              <Card.Text className="plan-age-range">más de 10 años</Card.Text>
            </div>
            <Card.Body className="plan-card-body">
              <ul className="plan-features-list">
                <li>Revisiones regulares</li>
                <li>Alimentación</li>
                <li>Ejercicio</li>
                <li>Salud dental</li>
                <li>Suplementos</li>
                <li>Salud mental</li>
                <li>Adaptación del entorno</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PlanesC;
