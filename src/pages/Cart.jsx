import React, { useContext, useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { CartContext } from "../components/cart/CartContext";
import CheckoutMP from "../components/payment/CheckoutMP";
import "./Cart.css";
import Swal from "sweetalert2";
import { BsCart4 } from "react-icons/bs";

const Cart = () => {
  const { cartItems, removeFromCart, updateItemQuantity, clearCart } =
    useContext(CartContext);

  const [usuarioLogeado, setUsuarioLogeado] = useState(null);
  const [pedidosAdmin, setPedidosAdmin] = useState([]);

  useEffect(() => {
    try {
      const userString = sessionStorage.getItem("usuarioLogeado");
      if (userString) {
        setUsuarioLogeado(JSON.parse(userString));
      }
    } catch (e) {
      setUsuarioLogeado(null);
    }

    if (usuarioLogeado?.rol === "admin") {
      const storedOrders = localStorage.getItem("adminOrders");
      if (storedOrders) {
        setPedidosAdmin(JSON.parse(storedOrders));
      } else {
        setPedidosAdmin([
          {
            id: "PED001",
            user: "cliente1@email.com",
            items: [{ name: "Primeros Pasos", qty: 1, price: 8000 }],
            total: 8000,
            status: "Pendiente",
          },
          {
            id: "PED002",
            user: "cliente2@email.com",
            items: [{ name: "Madurando", qty: 2, price: 12000 }],
            total: 24000,
            status: "Completado",
          },
          {
            id: "PED003",
            user: "admin@gmail.com",
            items: [{ name: "Adultos", qty: 1, price: 15000 }],
            total: 15000,
            status: "Pendiente",
          },
        ]);
      }
    }
  }, [usuarioLogeado]);

  const rol = usuarioLogeado?.rol || "usuario";

  const handleQuantityChange = (id, value) => {
    const newQty = Number(value);
    if (isNaN(newQty) || newQty < 1) return;
    updateItemQuantity(id, newQty);
  };

  const handleEliminarPedido = (idPedido) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedPedidos = pedidosAdmin.filter(
          (pedido) => pedido.id !== idPedido
        );
        setPedidosAdmin(updatedPedidos);
        localStorage.setItem("adminOrders", JSON.stringify(updatedPedidos));
        Swal.fire("Eliminado!", "El pedido ha sido eliminado.", "success");
      }
    });
  };

  const handleActualizarEstadoPedido = (idPedido, nuevoEstado) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Deseas cambiar el estado del pedido ${idPedido} a "${nuevoEstado}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#00bcd4",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, actualizar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedPedidos = pedidosAdmin.map((pedido) =>
          pedido.id === idPedido ? { ...pedido, status: nuevoEstado } : pedido
        );
        setPedidosAdmin(updatedPedidos);
        localStorage.setItem("adminOrders", JSON.stringify(updatedPedidos));
        Swal.fire(
          "Actualizado!",
          "El estado del pedido ha sido actualizado.",
          "success"
        );
      }
    });
  };

  if (rol === "admin") {
    return (
      <div className="container cart-container">
        <h2 className="cart-title">Panel de Administración de Pedidos</h2>
        {pedidosAdmin.length === 0 ? (
          <p>No hay pedidos registrados.</p>
        ) : (
          <Table striped bordered hover className="cart-table">
            <thead>
              <tr>
                <th>ID Pedido</th>
                <th>Usuario</th>
                <th>Items</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pedidosAdmin.map((pedido) => (
                <tr key={pedido.id}>
                  <td>{pedido.id}</td>
                  <td>{pedido.user}</td>
                  <td>
                    <ul>
                      {pedido.items.map((item, idx) => (
                        <li key={idx}>
                          {item.name} (x{item.qty}) - ${item.price}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>${pedido.total.toFixed(2)}</td>
                  <td>{pedido.status}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleEliminarPedido(pedido.id)}
                      className="me-2"
                    >
                      Eliminar Pedido
                    </Button>
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() =>
                        handleActualizarEstadoPedido(
                          pedido.id,
                          pedido.status === "Pendiente"
                            ? "Completado"
                            : "Pendiente"
                        )
                      }
                    >
                      Cambiar Estado (
                      {pedido.status === "Pendiente"
                        ? "Completado"
                        : "Pendiente"}
                      )
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        <div className="d-flex justify-content-center mt-4">
          <Button variant="secondary" onClick={() => clearCart()}>
            Vaciar Carrito de Cliente (simulado)
          </Button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0)
    return (
      <div>
        <p className="cart-container text-center titulo-carrito">
          Carrito de Compras <BsCart4 />
        </p>
        <p className="cart-container text-center carrito-vacio">
          No hay productos en el carrito
        </p>
      </div>
    );

  const total = cartItems.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  return (
    <div className="container cart-container">
      <h2 className="cart-title titulo-carrito">
        Carrito de Compras <BsCart4 />
      </h2>
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
