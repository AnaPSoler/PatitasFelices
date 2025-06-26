import { Container, Row, Col, Image } from "react-bootstrap";
import "./AboutUs.css";
import anaImg from "../assets/ana.jpeg";
import anaMascotaImg from "../assets/ana-mascota.jpeg";
import nicoImg from "../assets/nicolas.jpeg";
import nicoMascotaImg from "../assets/nicolas-mascota.jpeg";
import caroImg from "../assets/carolina.jpeg";
import caroMascotaImg from "../assets/carolina-mascota.jpeg";
import mauroImg from "../assets/mauro.jpeg";
import mauroMascotaImg from "../assets/mauro-mascota.jpeg";

const integrantes = [
  {
    nombre: "Ana Paula Soler",
    mascotaNombre: "Nina",
    imgPersona: anaImg,
    imgMascota: anaMascotaImg,
  },
  {
    nombre: "Nicolás Jose Miskevish",
    mascotaNombre: "Benji",
    imgPersona: nicoImg,
    imgMascota: nicoMascotaImg,
  },
  {
    nombre: "Carolina Bravo",
    mascotaNombre: "Rocky",
    imgPersona: caroImg,
    imgMascota: caroMascotaImg,
  },
  {
    nombre: "Mauro Mazzocato",
    mascotaNombre: "Luna",
    imgPersona: mauroImg,
    imgMascota: mauroMascotaImg,
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
