import React from "react";
import CarouselC from "../components/carousel/CarouselC";
import ServiciosC from "../components/servicios/ServiciosC";
import ProductosC from "../components/productos/ProductosC";
import PlanesC from "../components/planes/PlanesC";
import NuestrosProfesionalesC from "../components/nuestrosprofesionales/NuestrosProfesionalesC";
import TestimoniosC from "../components/testimonios/TestimoniosC"; 
import PublicidadC from "../components/publicidad/PublicidadC";
import MapSection from "../components/map/MapSection";
import "../App.css";

const Home = () => {
  return (
    <>
      <CarouselC />
      <ServiciosC />
      <ProductosC />
      <PlanesC />
      <NuestrosProfesionalesC />
      <TestimoniosC />
      <PublicidadC />
      <MapSection />
    </>
  );
};

export default Home;
