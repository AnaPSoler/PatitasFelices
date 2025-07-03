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

  const horariosDisponibles = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
  ];

  const token = sessionStorage.getItem("token");

  const configHeaders = {
    headers: {
      "Content-Type": "application/json",
      auth: token,
    },
  };

  useEffect(() => {
    const cargarTurnos = async () => {
      if (fecha && veterinario) {
        try {
          const { data } = await clientAxios.get("/shifts", getAuthHeaders());;
          if (Array.isArray(data)) {
            const ocupados = data
              .filter(
                (t) =>
                  new Date(t.fecha).toDateString() === fecha.toDateString() &&
                  t.veterinario === veterinario
              )
              .map((t) => t.hora);
            setHorariosOcupados(ocupados);
          } else {
            console.error("❌ Los turnos no llegaron como array:", data);
          }
        } catch (error) {
          console.error("Error al cargar turnos ocupados", error);
        }
      }
    };

    cargarTurnos();
  }, [fecha, veterinario]);

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
      <Card className="form-card animate__animated animate__fadeIn">
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
                  className="form-control"
                  minDate={new Date()}
                  placeholderText="Elegí una fecha"
                  required
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
              <Button type="submit" className="btn-personalizado">
                Confirmar Turno
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserShifts;
