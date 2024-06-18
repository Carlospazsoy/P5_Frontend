/* #1 import { createContext } from 'react'  Implementacion de context en UserContext*/
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./context/UserContext.jsx";
import { AddressProvider } from "./context/AddressContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import CategoryContext from "./context/CategoryContext.jsx";

/* #1.2  crear UserContext en carpeta context*/ /* definicion del metodo para crear un Componenente de Alto Nivel */

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      {/* UserProvider es nuestro proveedor personalizado que usa context, se cofigura solamente con api>index.js y context>UserContext.jsx*/}
      {/* <CategoryContext> */}
        <AddressProvider>
          <CartProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </CartProvider>
        </AddressProvider>
      {/* </CategoryContext> */}
    </UserProvider>
  </React.StrictMode>
);

/* El objetivo de este componente es implementar a UserProvider como un high order component que envuelva en un context todo nuestro proyecto de react */
