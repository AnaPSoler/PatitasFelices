import { useEffect, useState } from "react";
import { Form, Button, Container, Card, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import clientAxios, { getAuthHeaders } from "../helpers/axios.config.helper";
import "./UserShifts.css";

const UserShifts = () => {
  const [mascota, setMascota] = useState("");
  const [veterinario, setVeterinario] = useState("");
  const [fecha, setFecha] = useState(null);
  const [hora, setHora] = useState("");
  const [detalle, setDetalle] = useState("");
  const [horariosOcupados, setHorariosOcupados] = useState([]);
  const [turnosTotales, setTurnosTotales] = useState([]);
  const [misTurnos, setMisTurnos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const turnosPorPagina = 1;

  const horariosDisponibles = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
  ];

  const cargarTurnos = async () => {
    try {
      const { data } = await clientAxios.get("/shifts", getAuthHeaders());
      if (Array.isArray(data)) {
        setTurnosTotales(data);
        if (fecha && veterinario) {
          const ocupados = data
            .filter(
              (t) =>
                new Date(t.fecha).toDateString() === fecha.toDateString() &&
                t.veterinario === veterinario
            )
            .map((t) => t.hora);
          setHorariosOcupados(ocupados);
        }
      }
    } catch (error) {
      console.error("Error al cargar turnos ocupados", error);
    }
  };

  const obtenerMisTurnos = async () => {
    try {
      const { data } = await clientAxios.get("/shifts/mios", getAuthHeaders());
      if (Array.isArray(data)) setMisTurnos(data);
    } catch (error) {
      console.log("Error al obtener mis turnos", error);
    }
  };

  useEffect(() => {
    cargarTurnos();
    obtenerMisTurnos();
  }, [fecha, veterinario]);

  const estaDeshabilitado = (date) => {
    const day = date.getDay();
    const fechaFormateada = new Date(date).toDateString();
    const turnosDelDia = turnosTotales.filter(
      (t) => new Date(t.fecha).toDateString() === fechaFormateada
    );
    return (
      day === 0 ||
      day === 6 ||
      turnosDelDia.length >= horariosDisponibles.length
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mascota || !veterinario || !fecha || !hora) {
      return Swal.fire(
        "Campos incompletos",
        "Todos los campos son obligatorios",
        "warning"
      );
    }

    try {
      await clientAxios.post(
        "/shifts",
        { mascota, veterinario, fecha, hora, detalle },
        getAuthHeaders()
      );
      Swal.fire(
        "Turno reservado",
        "Tu turno fue registrado correctamente",
        "success"
      );
      setMascota("");
      setVeterinario("");
      setFecha(null);
      setHora("");
      setDetalle("");
      cargarTurnos();
      obtenerMisTurnos();
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.msg ||
          error.message ||
          "No se pudo reservar el turno",
        "error"
      );
    }
  };

  const esHoy = fecha && new Date().toDateString() === fecha.toDateString();

  const horariosHabilitados = horariosDisponibles.map((h) => {
    const [hH, hM] = h.split(":");
    const ahora = new Date();
    const horaActual = ahora.getHours();
    const minutosActuales = ahora.getMinutes();
    const deshabilitado =
      horariosOcupados.includes(h) ||
      (esHoy &&
        (parseInt(hH) < horaActual ||
          (parseInt(hH) === horaActual && parseInt(hM) <= minutosActuales)));
    return { hora: h, deshabilitado };
  });

  const totalPaginas = Math.ceil(misTurnos.length / turnosPorPagina);
  const turnoVisible = misTurnos.slice(
    (paginaActual - 1) * turnosPorPagina,
    paginaActual * turnosPorPagina
  )[0];

  return (
    <Container className="form-container">
      <Row className="g-4 flex-column flex-md-row">
        <Col md={6}>
          <Card className="form-card animate__animated animate__fadeIn">
            <Card.Body>
              <Card.Title className="titulo">Reservar Turno</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Mascota</Form.Label>
                  <Form.Control
                    type="text"
                    value={mascota}
                    onChange={(e) => setMascota(e.target.value)}
                    placeholder="Ej: Max"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Veterinario</Form.Label>
                  <Form.Select
                    value={veterinario}
                    onChange={(e) => setVeterinario(e.target.value)}
                    required
                  >
                    <option value="">Seleccionar</option>
                    <option value="Dra. Romero">Dra. Romero</option>
                    <option value="Dr. López">Dr. López</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3 me-5">
                  <Form.Label>Fecha</Form.Label>
                  <DatePicker
                    selected={fecha}
                    onChange={(date) => setFecha(date)}
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                    minDate={new Date()}
                    placeholderText="Elegí una fecha"
                    required
                    filterDate={(date) => !estaDeshabilitado(date)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Hora</Form.Label>
                  <Form.Select
                    value={hora}
                    onChange={(e) => setHora(e.target.value)}
                    required
                  >
                    <option value="">Seleccionar</option>
                    {horariosHabilitados.map(({ hora, deshabilitado }) => (
                      <option
                        key={hora}
                        value={hora}
                        disabled={deshabilitado}
                        className={deshabilitado ? "text-muted" : ""}
                      >
                        {hora} {deshabilitado ? "(No disponible)" : ""}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Detalle</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={detalle}
                    onChange={(e) => setDetalle(e.target.value)}
                    placeholder="Motivo de la consulta"
                  />
                </Form.Group>
                <div className="text-center">
                  <Button type="submit" className="btn btn-info text-white">
                    Confirmar Turno
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="mt-4 mt-md-0">
            <Card.Body>
              <Card.Title className="texto-color">📅 Mis Turnos</Card.Title>
              {turnoVisible ? (
                <>
                  <p>
                    <strong>Mascota:</strong> {turnoVisible.mascota}
                  </p>
                  <p>
                    <strong>Veterinario:</strong> {turnoVisible.veterinario}
                  </p>
                  <p>
                    <strong>Fecha:</strong>{" "}
                    {new Date(turnoVisible.fecha).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Hora:</strong> {turnoVisible.hora}
                  </p>
                  <p>
                    <strong>Detalle:</strong> {turnoVisible.detalle || "-"}
                  </p>

                  {totalPaginas > 1 && (
                    <div className="d-flex justify-content-center mt-3">
                      {[...Array(totalPaginas)].map((_, index) => (
                        <Button
                          key={index}
                          variant={
                            paginaActual === index + 1 ? "info" : "outline-info"
                          }
                          size="sm"
                          onClick={() => setPaginaActual(index + 1)}
                          className="mx-1"
                        >
                          {index + 1}
                        </Button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <p>No hay turnos registrados.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserShifts;
