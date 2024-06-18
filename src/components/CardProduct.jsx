import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./CardProduct.css";

function CardProduct({ imageUrl, title, price, linkTo }) {
  return (
    <div className="card">
      <Link to={linkTo} className="text-decoration-none text-dark">
        <img src={imageUrl} className="card-img-top" alt="Product" />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">Price: ${price}</p>
          {/* Usar un botón como alternativa para acciones dentro de la tarjeta */}
          {/* s */}
        </div>
      </Link>
    </div>
  );
}

export default CardProduct;
