import CarouselC from "../components/carousel/CarouselC";
import "./Home.css";

const Home = () => {
  return (
    <>
      <CarouselC />
      <h1 className="titulo text-center mt-5">Bienvenidos a Patitas Felices</h1>
      <p className="contenido text-center">
        Cuidamos a tus mascotas con amor y profesionalismo. Explora nuestros
        servicios y planes pensados para el bienestar de tu compañero peludo.
      </p>
    </>
  );
};

export default Home;
