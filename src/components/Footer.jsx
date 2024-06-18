import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import "../styles/Footer.css";

export default function Footer() {
  return (
    <>
   <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-col">
            <h4>BIOSMA</h4>
            <ul>
              <li>
                <Link to="/about-us">Sobre nosotros</Link>
              </li>
              <li>
                <Link to="/services">Nustros servicios</Link>
              </li>
              <li>
                <Link to="/privacy-policy">Politica de privacidad</Link>
              </li>
              <li>
                <Link to="/affiliate-program">Programa de afiliados</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Consigue ayuda</h4>
            <ul>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
              <li>
                <Link to="/shipping">Envios</Link>
              </li>
              <li>
                <Link to="/returns">Reembolsos</Link>
              </li>
              <li>
                <Link to="/order-status">Estado de orden</Link>
              </li>
              <li>
                <Link to="/payment-options">Opciones de pago</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Tienda en linea</h4>
            <ul>
              <li>
                <Link to="/shop/watch">Hogar</Link>
              </li>
              <li>
                <Link to="/shop/bag">Limpieza</Link>
              </li>
              <li>
                <Link to="/shop/shoes">Cuidado Personal</Link>
              </li>
              <li>
                <Link to="/shop/dress">Comida</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Siguenos</h4>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
    </>
  )
}
