import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./NuestrosProfesionalesC.css";

const profesionalesData = [
  {
    nombre: "Leticia Berger",
    especialidad: "Presidente",
    foto: "/img/np22.png",
  },
  {
    nombre: "Alejandro Pierini",
    especialidad: "Vice Presidente",
    foto: "/img/np11.png",
  },
];

const NuestrosProfesionalesC = () => {
  return (
    <div className="profesionales-section-full-width">
      <Container className="my-5 text-center profesionales-section-content">
        <h2 className="profesionales-title mb-4">
          <span className="profesionales-title-part1">NUESTROS</span>{" "}
          <span className="profesionales-title-part2">PROFESIONALES</span>
        </h2>
        <p className="profesionales-description mb-5">
          En Patitas Felices, contamos con un equipo de grandes profesionales
          altamente capacitados en las distintas áreas de la medicina
          veterinaria, incluyendo clínica general, cirugía, odontología,
          dermatología y cardiología. Nuestro compromiso es brindar una atención
          integral y personalizada, asegurando la salud y el bienestar de tus
          queridas mascotas en cada etapa de sus vidas. Confía en la experiencia
          y pasión de nuestros veterinarios.
        </p>

        <Row className="justify-content-center profesionales-row">
          {profesionalesData.map((profesional, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <div className="profesional-card">
                <img
                  src={profesional.foto}
                  alt={profesional.nombre}
                  className="profesional-img"
                />
                <div className="overlay">
                  <h3>{profesional.nombre}</h3>
                  <p>{profesional.especialidad}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default NuestrosProfesionalesC;
