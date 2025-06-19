import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./ProductosC.css";

const ProductosC = () => {
  const logoImages = [
    "/img/logo2.png",
    "/img/logo3.png",
    "/img/logo4.png",
    "/img/logo5.png",
    "/img/logo6.png",    
    "/img/logo8.png",
    "/img/logo9.png",
    "/img/logo10.png",
    "/img/logo11.png",
    "/img/logo12.png",
    "/img/logo2.png",
    "/img/logo3.png",
    "/img/logo4.png",
    "/img/logo5.png",
    "/img/logo6.png",
    "/img/logo8.png",
    "/img/logo9.png",
    "/img/logo10.png",
    "/img/logo11.png",
    "/img/logo12.png",
  ];

  return (
    <div>
      {" "}
      <Container fluid className="products-section-fluid-background">
        <Container className="my-5 products-section-content">
          <Row className="align-items-center">
            <Col xs={12} md={6} className="text-center text-md-start">
              <h2 className="products-section-title">TRABAJAMOS</h2>
              <h3 className="products-subtitle">
                Con las mejores marcas del mercado
              </h3>
              <p className="products-description">
                En Patitas Felices, tu mascota es nuestra prioridad. Por eso, te
                invitamos a conocernos. Nuestros profesionales, verdaderos
                expertos en nutrición animal, están listos para guiarte y
                orientarte, ayudándote a elegir el alimento perfecto que se
                ajuste a las necesidades únicas de tu fiel compañero. ¡Ven a
                visitarnos, te esperamos con las patitas abiertas!
              </p>
            </Col>
            <Col
              xs={12}
              md={6}
              className="d-flex justify-content-center align-items-center"
            >
              <img
                src="/img/productos.png"
                alt="Productos destacados"
                className="img-fluid products-imagen-unica"
              />
            </Col>
          </Row>
        </Container>
      </Container>
      <Container
        fluid
        className="logos-section-full-width products-section-fluid-background">
        <Row>
          <Col xs={12}>
            <div className="logos-carousel-container">
              <div className="logos-carousel-track">
                {logoImages.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Logo ${index + 2}`}
                    className="logo-item"
                  />
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductosC;
