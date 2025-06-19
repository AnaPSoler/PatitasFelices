import React from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";
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
      "Llevamos años trayendo a nuestro gato Simba a Patitas Felices y siempre recibimos el mejor trato. Son muy cuidadosos y explican todo con claridad. ¡Un equipo excepcional!",
    author: "Juan Pérez",
    pet: "Simba, un Gato Siamés",
  },
  {
    image: "/img/tt3.png",
    quote:
      "Los planes de Patitas Felices son una maravilla. Me dan la tranquilidad de saber que mi perrito Max tiene cubiertas todas sus necesidades de salud. ¡Y la atención es siempre súper eficiente y amigable, realmente cuidan a nuestros compañeros!",
    author: "Lana López",
    pet: "Max, un Golden Retriever",
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
              indicators
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
