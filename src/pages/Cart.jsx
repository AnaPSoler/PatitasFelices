import React, { useContext } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { CartContext } from "../components/cart/CartContext";
import CheckoutMP from "../components/payment/CheckoutMP";
import "./Cart.css";

const Cart = () => {
  const { cartItems, removeFromCart, updateItemQuantity } =
    useContext(CartContext);

  let usuarioLogeado = null;
  try {
    const userString = sessionStorage.getItem("usuarioLogeado");
    if (userString) {
      usuarioLogeado = JSON.parse(userString);
    }
  } catch (e) {
    usuarioLogeado = null;
  }

  const rol = usuarioLogeado?.rol || "usuario";

  const handleQuantityChange = (id, value) => {
    const newQty = Number(value);
    if (isNaN(newQty) || newQty < 1) return;
    updateItemQuantity(id, newQty);
  };

  if (cartItems.length === 0)
    return <p className="cart-container">No hay productos en el carrito.</p>;

  const total = cartItems.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  return (
    <div className="container cart-container">
      <h2 className="cart-title">Carrito de Compras</h2>
      <Table striped bordered hover className="cart-table">
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
          {cartItems.map((item, i) => (
            <tr key={item.id}>
              <td>{i + 1}</td>
              <td>{item.nombre}</td>
              <td>{item.descripcion}</td>
              <td>${item.precio}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  value={item.cantidad}
                  onChange={(e) =>
                    handleQuantityChange(item.id, e.target.value)
                  }
                  className="input-cantidad"
                />
              </td>
              <td>
                <Button
                  className="btn-eliminar"
                  size="sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  Eliminar
                </Button>
                {rol === "admin" && (
                  <Button
                    variant="warning"
                    size="sm"
                    style={{ marginLeft: "5px" }}
                    onClick={() => {
                      alert(`Acción administrativa para: ${item.nombre}`);
                    }}
                  >
                    Acción Admin
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="payment-centered">
        <h4 className="total-amount">Total: ${total.toFixed(2)}</h4>
        <div className="checkoutmp-container">
          <CheckoutMP cartItems={cartItems} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
