import { useEffect, useState } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import Swal from "sweetalert2";
import clientAxios, { getAuthHeaders } from "../helpers/axios.config.helper";
import "./Patients.css";
import { PiDogFill } from "react-icons/pi";

const Patients = () => {
  const [pacientes, setPacientes] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [busqueda, setBusqueda] = useState("");
  const [modalPaciente, setModalPaciente] = useState(null);
  const [formulario, setFormulario] = useState({});
  const pacientesPorPagina = 6;

  const obtenerPacientes = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("Sesión expirada");

      const { data } = await clientAxios.get("/pacientes", getAuthHeaders());
      if (Array.isArray(data)) setPacientes(data);
    } catch (error) {
      console.error("Error al obtener pacientes", error);
      Swal.fire("Error", "No se pudo cargar la lista de pacientes", "error");
    }
  };

  useEffect(() => {
    obtenerPacientes();
  }, []);

  const eliminarPaciente = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar ficha?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
    });

    if (confirm.isConfirmed) {
      try {
        await clientAxios.delete(`/pacientes/${id}`, getAuthHeaders());
        Swal.fire("Eliminado", "Ficha eliminada con éxito", "success");
        obtenerPacientes();
      } catch (error) {
        Swal.fire("Error", "No se pudo eliminar la ficha", "error");
      }
    }
  };

  const abrirModalEdicion = (paciente) => {
    setFormulario({ ...paciente });
    setModalPaciente(paciente);
  };

  const manejarCambio = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const guardarCambios = async () => {
    try {
      await clientAxios.put(
        `/pacientes/${formulario._id}`,
        formulario,
        getAuthHeaders()
      );
      Swal.fire("Actualizado", "Ficha actualizada correctamente", "success");
      setModalPaciente(null);
      obtenerPacientes();
    } catch (error) {
      Swal.fire("Error", "No se pudo actualizar la ficha", "error");
    }
  };

  const pacientesFiltrados = pacientes.filter((p) => {
    const nombreCompleto = `${p.nombreDuenio} ${p.apellidoDuenio}`.toLowerCase();
    return nombreCompleto.includes(busqueda.toLowerCase());
  });

  const indexInicio = (paginaActual - 1) * pacientesPorPagina;
  const pacientesActuales = pacientesFiltrados.slice(
    indexInicio,
    indexInicio + pacientesPorPagina
  );

  const totalPaginas = Math.ceil(
    pacientesFiltrados.length / pacientesPorPagina
  );

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">
        Fichas de Pacientes <PiDogFill />
      </h2>

      <Form.Control
        type="text"
        placeholder="Buscar por nombre del dueño"
        className="mb-4"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

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
                <div className="d-flex justify-content-between mt-3">
                  <Button
                    className="btn-modificar"
                    size="sm"
                    onClick={() => abrirModalEdicion(p)}
                  >
                    Modificar
                  </Button>
                  <Button
                    className="btn-eliminar"
                    size="sm"
                    onClick={() => eliminarPaciente(p._id)}
                  >
                    Eliminar
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

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

      <Modal
        show={!!modalPaciente}
        onHide={() => setModalPaciente(null)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar Ficha</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {[
              "nombreMascota",
              "nombreDuenio",
              "apellidoDuenio",
              "emailDuenio",
              "telefonoDuenio",
              "especie",
              "raza",
              "sexo",
              "edad",
              "peso",
            ].map((campo) => (
              <Form.Group className="mb-2" key={campo}>
                <Form.Label>
                  {campo.charAt(0).toUpperCase() + campo.slice(1)}
                </Form.Label>
                <Form.Control
                  type={["edad", "peso"].includes(campo) ? "number" : "text"}
                  name={campo}
                  value={formulario[campo] || ""}
                  onChange={manejarCambio}
                />
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalPaciente(null)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={guardarCambios}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="banner-desktop mt-4">
        <img
          src="/img/banner2.png"
          alt="Banner promocional"
          className="banner w-100"
        />
      </div>
    </Container>
  );
};

export default Patients;
