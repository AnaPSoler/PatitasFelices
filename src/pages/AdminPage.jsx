import { useEffect, useState } from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import Swal from "sweetalert2";
import clientAxios, { getAuthHeaders } from "../helpers/axios.config.helper";
import banner from "../assets/banner.png";
import "./AdminPage.css";
import { FaHandsClapping } from "react-icons/fa6";

const AdminPage = () => {
  const [turnosSemana, setTurnosSemana] = useState([]);

  useEffect(() => {
    const obtenerTurnos = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) throw new Error("Sesión no válida");

        const { data } = await clientAxios.get("/shifts", getAuthHeaders());

        const hoy = new Date();
        const lunes = new Date(hoy);
        lunes.setDate(hoy.getDate() - ((hoy.getDay() + 6) % 7));
        lunes.setHours(0, 0, 0, 0);

        const domingo = new Date(lunes);
        domingo.setDate(lunes.getDate() + 6);
        domingo.setHours(23, 59, 59, 999);

        const turnosDeSemana = data.filter((turno) => {
          const fechaTurno = new Date(turno.fecha);
          return fechaTurno >= lunes && fechaTurno <= domingo;
        });

        setTurnosSemana(turnosDeSemana);
      } catch (error) {
        console.error("Error al obtener turnos semanales", error);
        Swal.fire(
          "Error",
          "No se pudieron cargar los turnos de esta semana",
          "error"
        );
      }
    };

    obtenerTurnos();
  }, []);

  const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

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
        <span className="veterinarios">
          Veterinarios <FaHandsClapping />
        </span>
      </h1>

      <Container className="mt-4">
        <Card className="p-4 shadow-sm">
          <h3 className="text-center mb-4 semana">Turnos de esta semana</h3>
          <Row>
            {diasSemana.map((dia, idx) => {
              const turnosDelDia = turnosSemana
                .filter((t) => new Date(t.fecha).getDay() === idx + 1)
                .sort((a, b) => a.hora.localeCompare(b.hora));

              return (
                <Col md={6} lg={4} key={idx} className="mb-3">
                  <h5>{dia}</h5>
                  {turnosDelDia.length > 0 ? (
                    <ListGroup>
                      {turnosDelDia.map((turno) => (
                        <ListGroup.Item
                          key={turno._id}
                          className="d-flex text-start justify-content-center align-items-start"
                          style={{
                            minHeight: "60px",
                            flexDirection: "column",
                          }}
                        >
                          <div>
                            <strong>{turno.hora} -</strong>{" "}
                            <strong style={{ color: "#00bcd4" }}>
                              {turno.mascota}
                            </strong>{" "}
                            ({turno.veterinario}) {turno.detalle || "Consulta"}
                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  ) : (
                    <p className="text-muted">Sin turnos</p>
                  )}
                </Col>
              );
            })}
          </Row>
        </Card>
      </Container>
    </div>
  );
};

export default AdminPage;
