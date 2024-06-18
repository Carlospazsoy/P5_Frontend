import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import Logout from '../components/Logout';
import UserAddresses from './UserAddresses';
import instance from '../api';

export default function UserProfile() {
  const { user } = useContext(UserContext);
  const [newAddress, setNewAddress] = useState({
    name: '',
    lastName: '',
    street: '',
    number: '',
    apartment: '',
    zipCode: ''
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [logs, setLogs] = useState([]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prevState) => ({
      ...prevState,
      [name]: value
    }));
    console.log(`Field changed: ${name} = ${value}`);
    setLogs((prevLogs) => [...prevLogs, `Field changed: ${name} = ${value}`]);
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const headers = {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      };

      const response = await instance.post('/v1/address/', {
        ...newAddress,
        userId: user.data._id
      }, {
        headers
      });

      console.log('Address added successfully:', response.data);
      setSuccessMessage('Domicilio agregado exitosamente , recarga la pagina');
      setNewAddress({
        name: '',
        lastName: '',
        street: '',
        number: '',
        apartment: '',
        zipCode: ''
      });
      setLogs((prevLogs) => [...prevLogs, 'Address added successfully']);
    } catch (error) {
      console.error('Error adding address:', error.response || error.message);
      setLogs((prevLogs) => [...prevLogs, `Error adding address: ${error.response?.data?.message || error.message}`]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    
    <div className="container mt-4 ">
    <div className="row justify-content-center">


        <h2 className="">Perfil de Usuario</h2>
        <div className="col-md-9">

        <div className="card mb-4">
          <div className="card-body">
            <p><strong>Nombre:</strong> {user.data.name}</p>
            <p><strong>Apellido:</strong> {user.data.lastName}</p>
            <p><strong>Email:</strong> {user.data.email}</p>
            <p><strong>Rol:</strong> {user.data.role}</p>
            <p><strong>Id:</strong> {user.data._id}</p>
      <Logout />
          </div>
        </div>
        </div>
      </div>
    </div>

      <div className="container">

      
    {user.data._id && <UserAddresses userId={user.data._id} />}
    <div className="container">
    <div className="row justify-content-center">
    <div className="col-md-9">
    <div className="card mb-4">
    <div className="card-body">
    <h3>Agrega un nuevo domicilio</h3>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleAddAddress} className="mb-4">
        <div className="form-group">
          <input className="form-control mb-2" type="text" name="name" placeholder="Name" value={newAddress.name} onChange={handleChange} />
          <input className="form-control mb-2" type="text" name="lastName" placeholder="Last name" value={newAddress.lastName} onChange={handleChange} />
          <input className="form-control mb-2" type="text" name="street" placeholder="Street" value={newAddress.street} onChange={handleChange} />
          <input className="form-control mb-2" type="text" name="number" placeholder="Number" value={newAddress.number} onChange={handleChange} />
          <input className="form-control mb-2" type="text" name="apartment" placeholder="Apartment" value={newAddress.apartment} onChange={handleChange} />
          <input className="form-control mb-2" type="text" name="zipCode" placeholder="Zip Code" value={newAddress.zipCode} onChange={handleChange} />
        </div>
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'Agregando...' : 'Agregar domicilio'}
        </button>
      </form>


    </div>
    </div>
    </div>
    </div>
    </div>
      
    </div>
      {/* Uncomment to display logs */}
      {/* <h3>Logs</h3>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>{log}</li>
        ))}
      </ul> */}
    </>
  );
}
