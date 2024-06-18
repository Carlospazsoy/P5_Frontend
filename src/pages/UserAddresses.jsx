import React, { useState, useEffect, useContext } from "react";
import instance from "../api";
import { AddressContext } from "../context/AddressContext";

const UserAddresses = ({ userId }) => {
  const { selectedAddress, setSelectedAddress } = useContext(AddressContext);
  const [addresses, setAddresses] = useState([]);
  const [preferredAddress, setPreferredAddress] = useState(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await instance.get(`/v1/auth/users/${userId}`);
        setAddresses(response.data.data.addresses);

        const preferredResponse = await instance.get(`/v1/auth/user/${userId}/preferred-address`);
        setPreferredAddress(preferredResponse.data.data);
        setSelectedAddress(preferredResponse.data.data);
      } catch (error) {
        console.error("Error al obtener direcciones:", error);
      }
    };

    fetchAddresses();
  }, [userId, setSelectedAddress]);

  const handleSelect = (addressId) => {
    const selected = addresses.find((address) => address._id === addressId);
    if (selected) {
      setSelectedAddress(selected);
      setPreferredAddress(selected);
    } else {
      console.error("La dirección seleccionada no es válida");
    }
  };

  const handleSubmit = async () => {
    try {
      await instance.post(`/v1/auth/user/${userId}/preferred-address`, {
        addressId: selectedAddress._id,
      });
      alert("Domicilio preferido actualizado");
    } catch (error) {
      console.error("Error al actualizar el domicilio preferido:", error);
      alert("Hubo un problema al actualizar el domicilio preferido");
    }
  };

  const handleRemove = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await instance.delete(`/v1/address/${selectedAddress._id}`, {
        headers: headers
      });

      alert("Domicilio eliminado");
    } catch (error) {
      console.error("Error al eliminar el domicilio:", error);
      alert("Hubo un problema al eliminar el domicilio");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-md-9">
          <div className="card mt-4">
            <div className="card-body">
              <h2 className="card-title">Selecciona tu domicilio preferido</h2>
              
              <form>
                <ul className="list-group">
                  {addresses.map((address) => (
                    <li key={address._id} className="list-group-item">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="address"
                          id={`address-${address._id}`}
                          value={address._id}
                          checked={preferredAddress ? preferredAddress._id === address._id : false}
                          onChange={() => handleSelect(address._id)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`address-${address._id}`}
                        >
                          {`${address.street}, ${address.number}, ${address.apartment}, ${address.zipCode}`}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
                <button
                  className="btn btn-primary mt-3"
                  type="button"
                  onClick={handleSubmit}
                  disabled={!selectedAddress}
                >
                  Guardar
                </button>
                <button
                  className="btn btn-danger mt-3"
                  type="button"
                  onClick={handleRemove}
                  disabled={!selectedAddress}
                >
                  Borrar
                </button>
              </form>
              {preferredAddress && (
                <div>
                  <h3>Domicilio seleccionado:</h3>
                  <p>ID: {preferredAddress._id}</p>
                  <p>Calle: {preferredAddress.street}</p>
                  <p>Número: {preferredAddress.number}</p>
                  <p>Departamento: {preferredAddress.apartment}</p>
                  <p>Código postal: {preferredAddress.zipCode}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAddresses;
