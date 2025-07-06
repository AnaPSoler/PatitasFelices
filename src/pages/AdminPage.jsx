import { useEffect, useState } from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import clientAxios, { getAuthHeaders } from "../helpers/axios.config.helper";
import banner from "../assets/banner.png";
import "./AdminPage.css";

const AdminPage = () => {
  const [turnosSemana, setTurnosSemana] = useState([]);

  useEffect(() => {
    const obtenerTurnos = async () => {
      try {
        const { data } = await clientAxios.get("/shifts", getAuthHeaders());
        const semanaActual = new Date();
        const lunes = new Date(
          semanaActual.setDate(
            semanaActual.getDate() - semanaActual.getDay() + 1
          )
        );
        const domingo = new Date(semanaActual.setDate(lunes.getDate() + 6));

        const turnosDeSemana = data.filter((turno) => {
          const fechaTurno = new Date(turno.fecha);
          return fechaTurno >= lunes && fechaTurno <= domingo;
        });

        setTurnosSemana(turnosDeSemana);
      } catch (error) {
        console.error("Error al obtener turnos semanales", error);
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
        <span className="veterinarios">Veterinarios</span>
      </h1>

      <Container className="mt-4">
        <Card className="p-4 shadow-sm">
          <h3 className="text-center mb-4 semana">Turnos de esta semana</h3>
          <Row>
            {diasSemana.map((dia, idx) => (
              <Col md={6} lg={4} key={idx} className="mb-3">
                <h5>{dia}</h5>
                <ListGroup>
                  {turnosSemana
                    .filter((t) => new Date(t.fecha).getDay() === idx + 1)
                    .sort((a, b) => a.hora.localeCompare(b.hora))
                    .map((turno) => (
                      <ListGroup.Item
                        key={turno._id}
                        className="d-flex text-start justify-content-center align-items-start"
                        style={{
                          minHeight: "60px",
                          display: "flex",
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
                    )) || <p className="text-muted">Sin turnos</p>}
                </ListGroup>
              </Col>
            ))}
          </Row>
        </Card>
      </Container>
    </div>
  );
};

export default AdminPage;
