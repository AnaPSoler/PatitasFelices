import React, { useContext } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { CartContext } from "./CartContext";
import PropTypes from "prop-types";

const CartTable = ({ items }) => {
  const { removeFromCart, updateItemQuantity } = useContext(CartContext);

  const handleComprar = (item) => {
    console.log("Comprar:", item);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    const quantity = Math.max(1, parseInt(newQuantity, 10) || 1);
    updateItemQuantity(itemId, quantity);
  };

  return (
    <div className="table-responsive">
      <Table bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                El carrito está vacío
              </td>
            </tr>
          ) : (
            items.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.nombre}</td>
                <td>{item.descripcion}</td>
                <td>${item.precio.toFixed(2)}</td>
                <td>
                  <Form.Control
                    type="number"
                    min="1"
                    value={item.cantidad}
                    onChange={(e) =>
                      handleQuantityChange(item.id, e.target.value)
                    }
                    style={{ width: "70px" }}
                  />
                </td>
                <td className="d-flex flex-column align-items-center justify-content-center">
                  <Button
                    variant="danger"
                    size="sm"
                    className="my-1"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Eliminar
                  </Button>
                  <Button
                    className="btn-comprar-table my-1"
                    size="sm"
                    onClick={() => handleComprar(item)}
                  >
                    Comprar
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

CartTable.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      nombre: PropTypes.string.isRequired,
      descripcion: PropTypes.string,
      precio: PropTypes.number.isRequired,
      cantidad: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default CartTable;
