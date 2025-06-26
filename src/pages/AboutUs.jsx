import { Container, Row, Col, Image } from "react-bootstrap";
import "./AboutUs.css";

const integrantes = [
  {
    nombre: "Ana Paula Soler",
    mascotaNombre: "Nina",
    imgPersona: "/img/1.jpeg",
    imgMascota: "/img/2.jpeg",
  },
  {
    nombre: "Nicolas Miskevish",
    mascotaNombre: "Benji",
    imgPersona: "/img/3.jpeg",
    imgMascota: "/img/4.jpeg",
  },
  {
    nombre: "Carolina Bravo",
    mascotaNombre: "Rocky",
    imgPersona: "/img/5.jpeg",
    imgMascota: "/img/6.jpeg",
  },
  {
    nombre: "Mauro Mazzocato",
    mascotaNombre: "Luna",
    imgPersona: "/img/7.jpeg",
    imgMascota: "/img/8.jpeg",
  },
];

const AboutUs = () => {
  return (
    <div className="sobre-nosotros-page">
      <Container className="sobre-nosotros my-5">
        <Row>
          <Col>
            <h2>Sobre Nosotros</h2>
            <p className="frase-equipo">
              "Un equipo unido por el amor a los animales y la tecnología.
              Creamos esta web para acercar la veterinaria al corazón de cada
              familia."
            </p>
          </Col>
        </Row>

        <Row className="galeria mt-5">
          {integrantes.map((integrante, index) => (
            <Col key={index} md={3} sm={6} className="text-center mb-4">
              <Image
                src={integrante.imgPersona}
                roundedCircle
                className="avatar"
                alt={`Foto de ${integrante.nombre}`}
              />
              <p className="nombre-persona">{integrante.nombre}</p>

              <Image
                src={integrante.imgMascota}
                rounded
                className="avatar-mascota"
                alt={`Mascota de ${integrante.nombre}`}
              />
              <p className="nombre-mascota">{integrante.mascotaNombre}</p>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default AboutUs;
