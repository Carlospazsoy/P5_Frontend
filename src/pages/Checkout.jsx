import React, { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { Button } from "react-bootstrap";
import {
  PayPalScriptProvider,
  PayPalButtons,
} from "@paypal/react-paypal-js";
import instance from "../api";
import { useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";

function Checkout() {
  const { user } = useContext(UserContext);
  const userId = user && user.data && user.data._id;
  const navigate = useNavigate();

  const { cart, fetchCart, removeFromCart } = useContext(CartContext);

  useEffect(() => {
    if (userId) {
      fetchCart(userId); // Obtener los elementos del carrito cuando el componente se monta
    }
  }, [userId, fetchCart]);

  const handleRemove = (cartItemId) => {
    removeFromCart(cartItemId);
  };

  const handleProceedToPayment = () => {
    alert("Procediendo al pago");
  };

  const initialOptions = {
    "client-id": "test", // aquí hay que agregar el client id real para el modo producción
    currency: "MXN",
    intent: "capture",
  };

  // Calcular el total del carrito
  const total = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  if (!cart || cart.length === 0) {
    return <div className="container mt-5">El carrito está vacío</div>;
  }

  return (
    <PayPalScriptProvider options={initialOptions}>
      <>
        <div className="container mt-5">
          <h1>Checkout</h1>
          <ul className="list-group">
            {cart.map((item) => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={item._id}>
                {item.product.name} - ${item.product.price} - Cantidad:{" "}
                {item.quantity}
                {/* <Button variant="danger" onClick={() => handleRemove(item._id)}>
                  Eliminar
                </Button> */}
              </li>
            ))}
          </ul>
          <div className="list-group">
            <p className="list-group-item active">Total: ${total}</p>
          </div>
          {/* <Button variant="success" onClick={handleProceedToPayment}>
            Pagar
          </Button> */}

          <PayPalButtons
            onApprove={(data) => {
              console.log(data);
              return navigate('/v1/cart/complete');
            }}
            createOrder={() => {
              return instance
                .post('/v1/payments/create', { total })
                .then((response) => {
                  return response.data.orderID;
                });
            }}
            style={{ color: "silver" }}
          />
        </div>
        
    <div className="container">
    <div className="row justify-content-center">
    <div className="col-md-9">
    <div className="card h-100">
    <div className="card-body">
        <div className="container">
          <p>Puedes usar esta cuenta de prueba:</p>
          <ul>
            <li>Correo: sb-8t50n29697436@personal.example.com</li>
            <li>Password: 12345678 </li>
          </ul>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>


      </>
    </PayPalScriptProvider>
  );
}

export default Checkout;
