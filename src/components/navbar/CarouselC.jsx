import Carousel from "react-bootstrap/Carousel";
import "./CarouselC.css";

const CarouselC = () => {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img
          src="/img/Imagenes-carousel1.png"
          alt="imagen1"
          className="w-100 img-fluid"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="/img/Imagenes-carousel2.png"
          alt="imagen2"
          className="w-100 img-fluid"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="/img/Imagenes-carousel3.png"
          alt="imagen3"
          className="w-100 img-fluid"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselC;