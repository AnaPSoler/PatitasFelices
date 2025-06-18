import React from "react";
import "./PublicidadC.css";

const PublicidadC = () => {
  return (
    <div className="publicidad-section">
      <picture>
        <source srcset="/img/gifgran.gif" media="(min-width: 992px)" />
        <source
          srcset="/img/gifmed.gif"
          media="(min-width: 577px) and (max-width: 991px)"
        />
        <img
          src="/img/gifpeq.gif"
          alt="Publicidad Patitas Felices"
          className="publicidad-gif"
        />
      </picture>
    </div>
  );
};

export default PublicidadC;
