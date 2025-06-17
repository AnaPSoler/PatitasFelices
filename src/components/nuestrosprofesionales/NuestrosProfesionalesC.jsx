import React from "react";
import { Container } from "react-bootstrap";
import "./NuestrosProfesionalesC.css";

const profesionalesData = [
  {
    nombre: "Dra. Luciana Mota",
    especialidad: "Clínica General",
    foto: "/img/profesional1.jpg",
  },
  {
    nombre: "Dr. Marcos García",
    especialidad: "Cirugía Veterinaria",
    foto: "/img/profesional2.jpg",
  },
  {
    nombre: "Dra. Laura Díaz",
    especialidad: "Dermatología",
    foto: "/img/profesional3.jpg",
  },
  {
    nombre: "Dr. Lucía Prada",
    especialidad: "Odontología Veterinaria",
    foto: "/img/profesional4.jpg",
  },
  {
    nombre: "Dra. Sofía Castro",
    especialidad: "Cardiología",
    foto: "/img/profesional5.jpg",
  },
  {
    nombre: "Dr. Javier Morales",
    especialidad: "Oftalmología",
    foto: "/img/profesional6.jpg",
  },
  {
    nombre: "Dra. Rafa Armas",
    especialidad: "Fisioterapia",
    foto: "/img/profesional7.jpg",
  },
  {
    nombre: "Dr. Isa Gil",
    especialidad: "Nutrición Animal",
    foto: "/img/profesional8.jpg",
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

        <div className="profesionales-grid">
          {profesionalesData.map((profesional, index) => (
            <div
              key={index}
              className={`profesional-card profesional-${index + 1}`}
            >
              <img src={profesional.foto} alt={profesional.nombre} />
              <div className="overlay">
                <h3>{profesional.nombre}</h3>
                <p>{profesional.especialidad}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default NuestrosProfesionalesC;
