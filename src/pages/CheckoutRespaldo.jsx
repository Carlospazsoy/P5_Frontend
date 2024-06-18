import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import instance from "../api";
import { useNavigate } from "react-router";

export default function CheckoutRespaldo() {
  const navigate = useNavigate() 
  return (
    <PayPalScriptProvider options={{
      "clientId": "test" // aqui hay que agregar el client id real para el modo produccion
    }}>
      <div>
        <h1>Checkout</h1>
        <p>Total: $ 200</p>
        <PayPalButtons  onApprove={(data) => {
                                              console.log(data)
                                              return navigate('/v1/cart/complete')}}
                        createOrder={()=>{ return instance.post('/v1/payments/create', {total: 200}).then((response)=>{return response.data.orderID})}} //createOrder es un prop que genera una solicitud post a esa ruta del backend con el cuerpo {total: 100} y en consecuencia le pedimos que nos retorne un numero id para generar la transacción
                        style={{color: "silver"}}>

        </PayPalButtons>
      </div>
    </PayPalScriptProvider>
  ); 
}

// El objetivo de este componente es consumir el endpoint de nuestro backend