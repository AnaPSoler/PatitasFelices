import "./AdminPage.css";
import banner from "../assets/banner.png";

const AdminPage = () => {
  return (
    <div className="admin-home">
      <div className="banner-container">
        <img
          src={banner}
          alt="Banner Patitas Felices"
          className="admin-banner"
        />
      </div>
      <h1 className="admin-title">
        <span className="bienvenidos">Bienvenidos</span>{" "}
        <span className="veterinarios">Veterinarios</span>
      </h1>
    </div>
  );
};

export default AdminPage;
