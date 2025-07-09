import { useEffect, useState } from "react";
import {
  Container,
  Table,
  Button,
  Form,
  Row,
  Col,
  Card,
  Modal,
} from "react-bootstrap";
import Swal from "sweetalert2";
import clientAxios, { getAuthHeaders } from "../helpers/axios.config.helper";
import { FaTrash } from "react-icons/fa";
import "./AdminShifts.css";

const AdminShifts = () => {
  const [turnos, setTurnos] = useState([]);
  const [filtroVeterinario, setFiltroVeterinario] = useState("");
  const [filtroMascota, setFiltroMascota] = useState("");
  const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const turnosPorPagina = 6;

  const obtenerTurnos = async () => {
    try {
      const { data } = await clientAxios.get("/shifts", getAuthHeaders());
      setTurnos(data);
    } catch (error) {
      console.error("Error al obtener turnos", error);
    }
  };

  useEffect(() => {
    obtenerTurnos();
  }, []);

  const eliminarTurno = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Cancelar turno?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cancelar",
    });

    if (confirm.isConfirmed) {
      try {
        await clientAxios.delete(`/shifts/${id}`, getAuthHeaders());
        setTurnos(turnos.filter((t) => t._id !== id));
        Swal.fire("Eliminado", "El turno fue cancelado", "success");
      } catch (error) {
        Swal.fire("Error", "No se pudo cancelar el turno", "error");
      }
    }
  };

  const turnosFiltrados = turnos.filter((t) => {
    return (
      (!filtroVeterinario ||
        t.veterinario.toLowerCase() === filtroVeterinario.toLowerCase()) &&
      (!filtroMascota ||
        t.mascota.toLowerCase().includes(filtroMascota.toLowerCase()))
    );
  });

  const indexUltimoTurno = paginaActual * turnosPorPagina;
  const indexPrimerTurno = indexUltimoTurno - turnosPorPagina;
  const turnosActuales = turnosFiltrados.slice(
    indexPrimerTurno,
    indexUltimoTurno
  );
  const totalPaginas = Math.ceil(turnosFiltrados.length / turnosPorPagina);

  return (
    <Container fluid className="py-4">
      <Card className="p-4 shadow card-turnero">
        <h2 className="mb-4 text-center estilo">Gestión de Turnos</h2>

        <Row className="mb-3">
          <Col md={6} className="mb-2">
            <Form.Control
              placeholder="Filtrar por mascota"
              value={filtroMascota}
              onChange={(e) => setFiltroMascota(e.target.value)}
            />
          </Col>
          <Col md={6}>
            <Form.Select
              value={filtroVeterinario}
              onChange={(e) => setFiltroVeterinario(e.target.value)}
              className="estilo-texto"
            >
              <option value="">Todos los veterinarios</option>
              <option value="Dra. Romero">Dra. Romero</option>
              <option value="Dr. López">Dr. López</option>
            </Form.Select>
          </Col>
        </Row>

        <Table responsive bordered hover className="text-center">
          <thead>
            <tr>
              <th>Mascota</th>
              <th>Veterinario</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Detalle</th>
              <th>Nombre Dueño</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {turnosActuales.length > 0 ? (
              turnosActuales.map((turno) => (
                <tr key={turno._id}>
                  <td>{turno.mascota}</td>
                  <td>{turno.veterinario}</td>
                  <td>{new Date(turno.fecha).toLocaleDateString()}</td>
                  <td>{turno.hora}</td>
                  <td>{turno.detalle || "-"}</td>
                  <td>{turno.nombreDuenio || "-"}</td>
                  <td>
                    <Button
                      className="btn-colorboton"
                      size="sm"
                      onClick={() => setTurnoSeleccionado(turno)}
                    >
                      <FaTrash /> Eliminar
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No hay turnos registrados</td>
              </tr>
            )}
          </tbody>
        </Table>

        <div className="d-flex justify-content-center mt-3">
          {[...Array(totalPaginas)].map((_, index) => (
            <Button
              key={index}
              variant={paginaActual === index + 1 ? "info" : "outline-info"}
              size="sm"
              onClick={() => setPaginaActual(index + 1)}
              className="mx-1 paginacion"
            >
              {index + 1}
            </Button>
          ))}
        </div>
      </Card>

      <Modal
        show={!!turnoSeleccionado}
        onHide={() => setTurnoSeleccionado(null)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Turno</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            ¿Estás seguro que deseas eliminar el turno de{" "}
            <strong>{turnoSeleccionado?.mascota}</strong> con el veterinario{" "}
            <strong>{turnoSeleccionado?.veterinario}</strong> el día{" "}
            <strong>
              {new Date(turnoSeleccionado?.fecha).toLocaleDateString()}
            </strong>{" "}
            a las <strong>{turnoSeleccionado?.hora}</strong>?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setTurnoSeleccionado(null)}
          >
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={() => eliminarTurno(turnoSeleccionado._id)}
          >
            Confirmar Eliminación
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminShifts;
