import React from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import "./ProductosC.css";

const ProductosC = () => {
  return (
    <Container fluid className="products-section-fluid-background">
      <Container className="my-5 products-section-content">
        <Row className="align-items-center">
          <Col xs={12} md={6} className="text-start text-md-start text-center">
            <h2 className="products-section-title">
              PRODUCTOS{" "}
              <span className="products-section-title-highlight">
                DESTACADOS
              </span>
            </h2>
            <h3 className="products-subtitle">Alimentos Secos para Perros</h3>
            <p className="products-description">
              La alimentación es la base de una vida sana. En{" "}
              <span className="products-description-highlight">
                Patitas Felices
              </span>
              , encontrarás una cuidadosa selección de alimentos formulados para
              promover la salud.
            </p>
            <Button variant="primary" className="mt-3 products-button">
              Explorar Catálogo
            </Button>
          </Col>
          <Col xs={12} md={6}>
            <div className="products-images-row">
              <div className="product-img-col">
                <img
                  src="/img/pd1.png"
                  alt="Alimento Old Prince Perro 1"
                  className="img-fluid product-img"
                />
              </div>
              <div className="product-img-col">
                <img
                  src="/img/pd2.png"
                  alt="Alimento Old Prince Perro 2"
                  className="img-fluid product-img"
                />
              </div>
              <div className="product-img-col">
                <img
                  src="/img/pd3.png"
                  alt="Alimento Old Prince Perro 3"
                  className="img-fluid product-img"
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default ProductosC;
