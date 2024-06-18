import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.png";
import axios from "axios"; // Importa Axios
import "../components/NavBar.css";
import instance from "../api";
import CardProduct from "../components/CardProduct"; // Importa el componente CardProduct
export default function NavBar() {
  const { user } = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);
  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await instance.get(
        `/v1/products/name/${encodeURIComponent(searchTerm)}`
      );
      setSearchResult(response.data.data || []);
    } catch (error) {
      console.error("Error al buscar productos:", error);
      setSearchResult([]); // Limpiar los resultados en caso de error
    }
  };
  return (
    <>
      <div>
        {["sm"].map((expand) => (
          <Navbar
            key={expand}
            expand={expand}
            className="bg-body-tertiary mb-3 logo"
          >
            <Container fluid>
              <Navbar.Brand as={Link} to="/">
                <img
                  src={logo}
                  className="d-inline-block align-top"
                  alt="Biosma Logo"
                />
              </Navbar.Brand>
              <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-${expand}`}
              />
              <Form className="d-flex sm" onSubmit={handleSearch}>
                <Form.Control
                  type="search"
                  placeholder="Search, ex: cepillo, rollo, detergente"
                  className="me-5"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="outline-success" type="submit">
                  Search
                </Button>
              </Form>
              
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  BIOSMA
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link as={Link} to="/v1/cart">
                    <FontAwesomeIcon icon={faShoppingCart} />
                    {cartItemCount > 0 && <span>({cartItemCount})</span>}
                  </Nav.Link>
                  {user.logged ? (
                    <Nav.Link as={Link} to="/v1/perfil">Perfil</Nav.Link>
                  ) : (
                    <Nav.Link as={Link} to="/v1/login">Perfil</Nav.Link>
                  )}
                  {user.logged ? (
                    <Nav.Link as={Link} to="/v1/#">Notificaciones</Nav.Link>
                  ) : (
                    <Nav.Link as={Link} to="/v1/login">Notificaciones</Nav.Link>
                  )}
                  {user.logged ? (
                    <Nav.Link className='button' as={Link} to="/v1/login">Ingresar</Nav.Link>
                  ) : (
                    <Nav.Link as={Link} to="/v1/login">Ingresar</Nav.Link>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ))}
      </div>
      {/* Mostrar resultados de búsqueda solo si hay resultados */}
{searchTerm && searchResult.length > 0 && (
  <div className="container">
    <h3>Resultados de búsqueda</h3>
    <div className="row">
      {searchResult.map((product) => (
        <div className="col-md-4" key={product._id}>
          <CardProduct
            imageUrl={product.imageURL}
            title={product.name}
            price={product.price}
            linkTo={`/v1/tienda/${product._id}`}
          />
        </div>
      ))}
    </div>
  </div>
)}
{/* Mostrar mensaje de "No se encontraron resultados" si no hay resultados */}
{searchTerm && searchResult.length === 0 && (
  <div className="container">
    <p className="mt-3">No se encontraron resultados</p>
  </div>
)}
{/* Mostrar contenido inicial (sin rastro del bloque de resultados) si searchTerm está vacío */}
{!searchTerm && (
  <div className="container">
    {/* Puedes mostrar algún contenido inicial aquí si lo deseas */}
  </div>
)}
    </>
  );
}
