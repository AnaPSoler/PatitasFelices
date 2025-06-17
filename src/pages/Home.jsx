import React from "react";
import CarouselC from "../components/carousel/CarouselC";
import ServiciosC from "../components/servicios/ServiciosC";
import ProductosC from "../components/productos/ProductosC"; 
import "../App.css";

const Home = () => {
  return (
    <>
      <CarouselC />
      <ServiciosC />
      <ProductosC />
    </>
  );
};

export default Home;
