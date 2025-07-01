import { useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "./Page404.css";

const Page404 = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-left">
        <DotLottieReact
          src="https://lottie.host/46455992-0a02-4456-9879-3222cf1f9ce9/lWiWg4j8fn.lottie"
          loop
          autoplay
          style={{ width: "120%", height: "120%" }}
        />
      </div>
      <div className="not-found-right">
        <h1 className="not-found-title">404 - Página no encontrada</h1>
        <p className="not-found-text">
          Lo sentimos, la página que estás buscando no existe o fue movida.
        </p>
        <button className="not-found-button" onClick={() => navigate("/")}>
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default Page404;
