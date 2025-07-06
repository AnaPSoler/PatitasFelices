import { useEffect, useState } from "react";
import { Container, Card, Row, Col, Button, Pagination } from "react-bootstrap";
import clientAxios, { getAuthHeaders } from "../helpers/axios.config.helper";
import "./Patients.css";

const Patients = () => {
  const [pacientes, setPacientes] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const pacientesPorPagina = 6;

  const obtenerPacientes = async () => {
    try {
      const { data } = await clientAxios.get("/pacientes", getAuthHeaders());
      setPacientes(data);
    } catch (error) {
      console.error("Error al obtener pacientes", error);
    }
  };

  useEffect(() => {
    obtenerPacientes();
  }, []);

  const indexInicio = (paginaActual - 1) * pacientesPorPagina;
  const pacientesActuales = pacientes.slice(
    indexInicio,
    indexInicio + pacientesPorPagina
  );

  const totalPaginas = Math.ceil(pacientes.length / pacientesPorPagina);

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Fichas de Pacientes</h2>
      <Row>
        {pacientesActuales.map((p) => (
          <Col md={6} lg={4} key={p._id} className="mb-4">
            <Card className="patient-card shadow">
              <Card.Body>
                <Card.Title className="text-info">{p.nombreMascota}</Card.Title>
                <hr />
                <p>
                  <strong>Dueño:</strong> {p.nombreDuenio} {p.apellidoDuenio}
                </p>
                <p>
                  <strong>Email:</strong> {p.emailDuenio}
                </p>
                <p>
                  <strong>Teléfono:</strong> {p.telefonoDuenio}
                </p>
                <p>
                  <strong>Especie:</strong> {p.especie}
                </p>
                <p>
                  <strong>Raza:</strong> {p.raza}
                </p>
                <p>
                  <strong>Sexo:</strong> {p.sexo}
                </p>
                <p>
                  <strong>Edad:</strong> {p.edad} años
                </p>
                <p>
                  <strong>Peso:</strong> {p.peso} kg
                </p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {totalPaginas > 1 && (
        <div className="d-flex justify-content-center">
          <Pagination>
            {[...Array(totalPaginas)].map((_, i) => (
              <Pagination.Item
                key={i + 1}
                active={paginaActual === i + 1}
                onClick={() => setPaginaActual(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      )}
    </Container>
  );
};

export default Patients;
