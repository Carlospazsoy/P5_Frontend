import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { AddressContext } from '../context/AddressContext';

const NavBar2 = () => {
  const { selectedAddress } = useContext(AddressContext);
  const [zipCode, setZipCode] = useState('');

  // Update zipCode whenever selectedAddress changes
  useEffect(() => {
    if (selectedAddress && selectedAddress.data) {
      setZipCode(selectedAddress.data.zipCode);
    } else {
      setZipCode('No seleccionado');
    }
  }, [selectedAddress]);

  return (
    <div>
      <Nav variant="pills" activeKey="1">
        <Nav.Item>
          <Nav.Link eventKey="2" as={Link} to="/v1/perfil">
            Código Postal: {zipCode}
          </Nav.Link>
        </Nav.Item>
        {/* <NavDropdown title="Categorías" id="nav-dropdown">
          <NavDropdown.Item eventKey="4.1" as={Link} to="/home">Home</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.2" as={Link} to="/cleaning">Cleaning</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.3" as={Link} to="/personal-care">Personal Care</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.4" as={Link} to="/babys">Babys</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.5" as={Link} to="/food">Food</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.6" as={Link} to="/clothes">Clothes</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item eventKey="4.7" as={Link} to="/separated-link">Separated link</NavDropdown.Item>
        </NavDropdown> */}
        <Nav.Item>
          <Nav.Link eventKey="3" disabled>
            Primer envío GRATIS
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default NavBar2;
