import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import "../styles/Home.css";

import Logout from "../components/Logout";
import Tienda from "../pages/Tienda";
// import NavBar2 from "./NavBar2";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Carousel from "react-bootstrap/Carousel";



import NavBar from "../components/NavBar";
import NavBar2 from "../components/NavBar2";
import Cart from "../components/Cart";
import Footer from "../components/Footer";
import HeroCarousel from "../components/Carousel";


export default function Home() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <NavBar />
      <NavBar2 />
      <HeroCarousel/>
      <Tienda />
      
    {/* NavBarAdmin */}
      {/* <div className="navbarAdmin-container">
        <ul>
          <li>
            <Link to="/v1/tienda">Tienda</Link>
          </li>
          <li>
            <Link to="/v1/admin/products/add">Agregar producto</Link>
          </li>
        </ul>
      </div> */}

    <Footer></Footer>

    </div>
  );
}
