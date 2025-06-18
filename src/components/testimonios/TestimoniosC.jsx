import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./TestimoniosC.css";

const testimonialsData = [
  {
    image: "/img/tt1.png",
    quote:
      "Desde que conocí Patitas Felices, sé que mi perrita Luna está en las mejores manos. La atención es siempre cálida, profesional y se nota el amor por los animales. ¡Confío plenamente en su equipo y en cada diagnóstico!",
    author: "Marta Gómez",
    pet: "Luna, una Border Collie",
  },
  {
    image: "/img/tt2.png",
    quote:
      "Llevamos años trayendo a nuestro gato Max a Patitas Felices y siempre recibimos el mejor trato. Son muy cuidadosos y explican todo con claridad. ¡Un equipo excepcional!",
    author: "Juan Pérez",
    pet: "Max, un Gato Siamés",
  },
  {
    image: "/img/tt3.png",
    quote:
      "¡No podría estar más contenta con Patitas Felices! Mi hámster tuvo un problema y lo solucionaron rápidamente. La dedicación y el cariño que muestran por cada mascota es admirable.",
    author: "Ana López",
    pet: "Pelusa, una Hámster Siria",
  },
];

const TestimoniosC = () => {
  return (
    <section className="testimonials-section">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8} className="text-center">
            <h2 className="testimonials-title">TESTIMONIOS</h2>
            <Carousel
              controls={false} 
              indicators={true} 
              interval={7000} 
              className="testimonial-carousel"
            >
              {testimonialsData.map((testimonial, index) => (
                <Carousel.Item key={index}>
                  <div className="testimonial-content">
                    <img
                      src={testimonial.image}
                      alt={`Foto de ${testimonial.author}`}
                      className="testimonial-avatar"
                    />
                    <p className="testimonial-quote">"{testimonial.quote}"</p>
                    <p className="testimonial-author">
                      — {testimonial.author} (
                      <span className="testimonial-pet">{testimonial.pet}</span>
                      )
                    </p>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TestimoniosC;
