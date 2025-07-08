import { useEffect, useState } from "react";
import {
  Container,
  Form,
  Button,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import Swal from "sweetalert2";
import clientAxios, { getAuthHeaders } from "../helpers/axios.config.helper";
import "./UserPet.css";
import { LiaPawSolid } from "react-icons/lia";

const UserPet = () => {
  const [form, setForm] = useState({
    nombreDuenio: "",
    apellidoDuenio: "",
    emailDuenio: "",
    telefonoDuenio: "",
    nombreMascota: "",
    especie: "",
    raza: "",
    sexo: "",
    edad: "",
    peso: "",
  });
  const [mascotas, setMascotas] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const mascotasPorPagina = 1;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telefonoRegex = /^\d{8,15}$/;

    if (!emailRegex.test(form.emailDuenio)) {
      return Swal.fire("Error", "Email no válido", "warning");
    }

    if (!telefonoRegex.test(form.telefonoDuenio)) {
      return Swal.fire("Error", "Teléfono no válido", "warning");
    }

    try {
      await clientAxios.post("/pacientes", form, getAuthHeaders());
      Swal.fire("Éxito", "Ficha de mascota registrada correctamente", "success");
      setForm({
        nombreDuenio: "",
        apellidoDuenio: "",
        emailDuenio: "",
        telefonoDuenio: "",
        nombreMascota: "",
        especie: "",
        raza: "",
        sexo: "",
        edad: "",
        peso: "",
      });
      obtenerMascotas();
    } catch (error) {
      Swal.fire("Error", "No se pudo registrar la mascota", "error");
    }
  };

  const obtenerMascotas = async () => {
    try {
      const { data } = await clientAxios.get("/pacientes/mia", getAuthHeaders());
      if (Array.isArray(data)) setMascotas(data);
    } catch (error) {
      console.log("No hay mascotas registradas", error);
    }
  };

  useEffect(() => {
    obtenerMascotas();
  }, []);

  const mascotaActual = mascotas.slice(
    (paginaActual - 1) * mascotasPorPagina,
    paginaActual * mascotasPorPagina
  );

  const totalPaginas = Math.ceil(mascotas.length / mascotasPorPagina);

  return (
    <Container className="user-pet-container py-4">
      <Row className="tarjetas-row">
        <Col lg={mascotas.length ? 6 : 12} className="tarjeta-col mb-4">
          <Card className="p-4 shadow tarjeta-card">
            <h2 className="text-center mb-4">Registrar mi Mascota</h2>
            <Form onSubmit={handleSubmit}>
              <h4>Información del Dueño</h4>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombreDuenio"
                    value={form.nombreDuenio}
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col md={6}>
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control
                    type="text"
                    name="apellidoDuenio"
                    value={form.apellidoDuenio}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="emailDuenio"
                    value={form.emailDuenio}
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col md={6}>
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    type="tel"
                    name="telefonoDuenio"
                    value={form.telefonoDuenio}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Row>
              <h4>Información de la Mascota</h4>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombreMascota"
                    value={form.nombreMascota}
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col md={6}>
                  <Form.Label>Especie</Form.Label>
                  <Form.Control
                    type="text"
                    name="especie"
                    value={form.especie}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Label>Raza</Form.Label>
                  <Form.Control
                    type="text"
                    name="raza"
                    value={form.raza}
                    onChange={handleChange}
                  />
                </Col>
                <Col md={6}>
                  <Form.Label>Sexo</Form.Label>
                  <Form.Select
                    name="sexo"
                    value={form.sexo}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccionar</option>
                    <option value="Macho">Macho</option>
                    <option value="Hembra">Hembra</option>
                  </Form.Select>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Label>Edad</Form.Label>
                  <Form.Control
                    type="number"
                    name="edad"
                    value={form.edad}
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col md={6}>
                  <Form.Label>Peso (kg)</Form.Label>
                  <Form.Control
                    type="number"
                    name="peso"
                    value={form.peso}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Row>
              <div className="text-center">
                <Button variant="info" type="submit">
                  Guardar Datos
                </Button>
              </div>
            </Form>
          </Card>
        </Col>

        {mascotaActual.length > 0 && (
          <Col lg={6} className="tarjeta-col mb-4">
            <Card className="p-4 shadow bg-light tarjeta-card">
              <h4 className="mb-3 text-deco text-center">
                Mascota Registrada <LiaPawSolid />
              </h4>
              <p>
                <strong>Dueño:</strong> {mascotaActual[0].nombreDuenio}{" "}
                {mascotaActual[0].apellidoDuenio}
              </p>
              <p>
                <strong>Email:</strong> {mascotaActual[0].emailDuenio}
              </p>
              <p>
                <strong>Teléfono:</strong> {mascotaActual[0].telefonoDuenio}
              </p>
              <p>
                <strong>Nombre Mascota:</strong>{" "}
                {mascotaActual[0].nombreMascota}
              </p>
              <p>
                <strong>Especie:</strong> {mascotaActual[0].especie}
              </p>
              <p>
                <strong>Raza:</strong> {mascotaActual[0].raza}
              </p>
              <p>
                <strong>Sexo:</strong> {mascotaActual[0].sexo}
              </p>
              <p>
                <strong>Edad:</strong> {mascotaActual[0].edad}
              </p>
              <p>
                <strong>Peso:</strong> {mascotaActual[0].peso} kg
              </p>

              <div className="d-flex justify-content-center mt-3">
                {[...Array(totalPaginas)].map((_, index) => (
                  <Button
                    key={index}
                    variant={
                      paginaActual === index + 1 ? "info" : "outline-info"
                    }
                    size="sm"
                    onClick={() => setPaginaActual(index + 1)}
                    className="mx-1 paginacion"
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default UserPet;
