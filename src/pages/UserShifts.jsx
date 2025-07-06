import { useEffect, useState } from "react";
import { Form, Button, Container, Card, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import clientAxios, { getAuthHeaders } from "../helpers/axios.config.helper";
import { FaTimesCircle } from "react-icons/fa";
import "./UserShifts.css";

const UserShifts = () => {
  const [mascota, setMascota] = useState("");
  const [veterinario, setVeterinario] = useState("");
  const [fecha, setFecha] = useState(null);
  const [hora, setHora] = useState("");
  const [detalle, setDetalle] = useState("");
  const [horariosOcupados, setHorariosOcupados] = useState([]);
  const [turnosTotales, setTurnosTotales] = useState([]);
  const [turnoConfirmado, setTurnoConfirmado] = useState(null);
  const [miTurno, setMiTurno] = useState(null);

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
      } else {
        console.error("❌ Los turnos no llegaron como array:", data);
      }
    } catch (error) {
      console.error("Error al cargar turnos ocupados", error);
    }
  };

  const obtenerMiTurno = async () => {
    try {
      const { data } = await clientAxios.get("/shifts/mios", getAuthHeaders());
      if (Array.isArray(data) && data.length > 0) {
        const ultimo = data[data.length - 1];
        setMiTurno(ultimo);
      }
    } catch (error) {
      console.log("No se encontró turno registrado", error);
    }
  };

  useEffect(() => {
    cargarTurnos();
    obtenerMiTurno();
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
      const response = await clientAxios.post(
        "/shifts",
        { mascota, veterinario, fecha, hora, detalle },
        getAuthHeaders()
      );

      Swal.fire("Turno reservado", response.data.msg, "success");

      setTurnoConfirmado({ mascota, veterinario, fecha, hora, detalle });
      setMascota("");
      setVeterinario("");
      setFecha(null);
      setHora("");
      setDetalle("");
    } catch (error) {
      console.error("Error al enviar turno:", error);
      Swal.fire(
        "Error",
        error.response?.data?.msg || "No se pudo reservar el turno",
        "error"
      );
    }
  };

  return (
    <Container className="form-container">
      <Row className="g-4 flex-column flex-md-row">
        <Col md={8} className="w-100">
          <Card className="form-card animate__animated animate__fadeIn w-100">
            <Card.Body>
              <Card.Title className="titulo">Reservar Turno</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre de la mascota</Form.Label>
                  <Form.Control
                    type="text"
                    value={mascota}
                    onChange={(e) => setMascota(e.target.value)}
                    placeholder="Ej: Firulais"
                    required
                  />
                </Form.Group>
                <Row className="mb-3">
                  <Col>
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
                  </Col>
                  <Col>
                    <Form.Label>Fecha</Form.Label>
                    <DatePicker
                      selected={fecha}
                      onChange={(date) => setFecha(date)}
                      dateFormat="dd/MM/yyyy"
                      className="form-control datepicker-custom"
                      minDate={new Date()}
                      placeholderText="Elegí una fecha"
                      required
                      filterDate={(date) => !estaDeshabilitado(date)}
                      dayClassName={(date) => {
                        const formateada = new Date(date).toDateString();
                        const turnosDelDia = turnosTotales.filter(
                          (t) => new Date(t.fecha).toDateString() === formateada
                        ).length;
                        const esFinDeSemana =
                          date.getDay() === 0 || date.getDay() === 6;
                        if (
                          esFinDeSemana ||
                          turnosDelDia >= horariosDisponibles.length
                        ) {
                          return "fecha-ocupada";
                        }
                        return undefined;
                      }}
                    />
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Horario</Form.Label>
                  <Form.Select
                    value={hora}
                    onChange={(e) => setHora(e.target.value)}
                    required
                  >
                    <option value="">Seleccionar</option>
                    {horariosDisponibles.map((h) => (
                      <option
                        key={h}
                        value={h}
                        disabled={horariosOcupados.includes(h)}
                        className={
                          horariosOcupados.includes(h) ? "horario-ocupado" : ""
                        }
                      >
                        {h} {horariosOcupados.includes(h) ? "(Ocupado)" : ""}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Detalle</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={detalle}
                    onChange={(e) => setDetalle(e.target.value)}
                    placeholder="Descripción del motivo de consulta"
                  />
                </Form.Group>
                <div className="text-center">
                  <Button
                    type="submit"
                    className="btn btn-info text-white px-4"
                  >
                    Confirmar Turno
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="w-100">
          {(turnoConfirmado || miTurno) && (
            <Card className="turno-confirmado mt-4 mt-md-0">
              <Card.Body>
                <Card.Title className="text-success">🗓️ Mi Turno</Card.Title>
                <p>
                  <strong>Mascota:</strong>{" "}
                  {(turnoConfirmado || miTurno).mascota}
                </p>
                <p>
                  <strong>Veterinario:</strong>{" "}
                  {(turnoConfirmado || miTurno).veterinario}
                </p>
                <p>
                  <strong>Fecha:</strong>{" "}
                  {new Date(
                    (turnoConfirmado || miTurno).fecha
                  ).toLocaleDateString()}
                </p>
                <p>
                  <strong>Hora:</strong> {(turnoConfirmado || miTurno).hora}
                </p>
                <p>
                  <strong>Detalle:</strong>{" "}
                  {(turnoConfirmado || miTurno).detalle || "-"}
                </p>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UserShifts;
