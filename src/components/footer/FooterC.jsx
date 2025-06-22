import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";
import logo from "../../assets/logo.png";
import "./FooterC.css";

const FooterC = () => {
  return (
    <footer className="footer bg-white border-top mt-5 pt-4 pb-0">
      <Container className="pt-4 pb-3">
        <Row className="text-center text-md-start align-items-center">
          
          <Col xs={12} md={4} className="mb-4 mb-md-0">
            <a href="/" className="logo-link" aria-label="Inicio">
              <img
                src={logo}
                alt="Logo Patitas Felices"
                height="95"
                className="logo-footer"
              />
            </a>
          </Col>

          <Col
            xs={12}
            md={4}
            className="mb-4 mb-md-0 d-flex justify-content-center gap-3 social-icons"
          >
            <a
              href="https://www.facebook.com/?locale=es_LA"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/#"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.tiktok.com/es/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon"
              aria-label="Tiktok"
            >
              <FaTiktok />
            </a>
            <a
              href="https://x.com/?lang=es"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon"
              aria-label="X"
            >
              <FaXTwitter />
            </a>
          </Col>

          <Col xs={12} md={4} className="footer-info">
            <p className="mb-1">Jufré 279, C1414</p>
            <p className="mb-1">Cdad. Autónoma de Buenos Aires</p>
            <p className="mb-1">011 2616-3173</p>
            <p className="mb-0">patitasfelices@gmail.com</p>
          </Col>
        </Row>
      </Container>
      
      <div className="footer-bottom text-center py-2">
        © 2025 Patitas Felices. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default FooterC;
