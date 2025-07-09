import React, { useEffect, useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";

const CheckoutMP = ({ cartItems }) => {
  const [preferenceId, setPreferenceId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    initMercadoPago("TEST-84f0c3bd-3578-4100-ae49-c1ef86ee9509", {
      locale: "es-AR",
    });
  }, []);

  useEffect(() => {
    const loadPreference = async () => {
      if (!cartItems || cartItems.length === 0) {
        setPreferenceId(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const itemsForMP = cartItems.map((item) => {
          let cleanedPrice = item.precio;
          if (typeof cleanedPrice === "string") {
            cleanedPrice = cleanedPrice.replace(/[^\d.,]/g, "");
            cleanedPrice = cleanedPrice.replace(/\./g, "");
            cleanedPrice = cleanedPrice.replace(/,/g, ".");
          }
          const parsedPrice = parseFloat(cleanedPrice);
          const parsedQuantity = Number(item.cantidad);

          if (isNaN(parsedPrice) || parsedPrice <= 0) {
            throw new Error(`Precio inválido para el ítem '${item.nombre}'.`);
          }
          if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
            throw new Error(`Cantidad inválida para el ítem '${item.nombre}'.`);
          }

          return {
            id: item.id.toString(),
            title: item.nombre,
            description: item.descripcion || "Producto sin descripción",
            picture_url: item.imagen || "https://example.com/default.jpg",
            unit_price: parsedPrice,
            quantity: parsedQuantity,
            currency_id: "ARS",
          };
        });

        const backendUrl =
          import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

        const response = await axios.post(
          `${backendUrl}/mercadopago/create_preference`,
          { items: itemsForMP }
        );

        if (response.data && response.data.id) {
          setPreferenceId(response.data.id);
        } else {
          setError("No se pudo obtener el ID de preferencia de Mercado Pago.");
          setPreferenceId(null);
        }
      } catch (e) {
        setError(
          e.message.includes("inválido")
            ? e.message
            : "Error al procesar el pago. Intente de nuevo más tarde."
        );
        setPreferenceId(null);
      } finally {
        setLoading(false);
      }
    };

    loadPreference();
  }, [cartItems]);

  if (loading) return <p>Cargando opciones de pago...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!preferenceId) return <p>Agrega productos al carrito para pagar.</p>;

  return (
    <div style={{ marginTop: "1rem" }}>
      <Wallet initialization={{ preferenceId }} />
    </div>
  );
};

export default CheckoutMP;
