import { Container } from "react-bootstrap";

const MapSection = () => {
  return (
    <section className="map-section w-100">
      
      <Container fluid className="p-0">
        <iframe
          title="Mapa Patitas Felices"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.308449345509!2d-58.432200824268935!3d-34.64681797293286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccbaf6c3b9c03%3A0x6edbbbd5f6c7ad94!2sJufr%C3%A9%20279%2C%20C1414%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1719047169334!5m2!1ses-419!2sar"
          width="100%"
          height="200"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </Container>
    </section>
  );
};

export default MapSection;
