import React, { createContext, useState, useEffect, useContext } from 'react';
import instance from '../api'; // Importa tu instancia de axios
import { UserContext } from './UserContext';

export const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const { user, setUser } = useContext(UserContext);
  const test = user.data.addresses
  // console.log(typeof test);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    const fetchPreferredAddress = async () => {
      if (!user) {
        console.warn("usuario aun no definido");
        return;
      }

      try {
        if (user && user.data && user.data._id) {
          const response = await instance.get(`/v1/auth/user/${user.data._id}/preferred-address`);
          setSelectedAddress(response.data);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Si la respuesta es 404 (no encontrado), realizar solicitud POST
          try {
            const postResponse = await instance.post(`/v1/auth/user/${user.data._id}/preferred-address`, {
              addressId: "666234151c282e7c5b47bc34"
            });
            setSelectedAddress(postResponse.data); // Establece el resultado de la solicitud POST como selectedAddress
          } catch (postError) {
            console.error('Error posting preferred address:', postError);
          }
        } else {
          console.error('Error fetching preferred address:', error);
        }
      }
    };

    fetchPreferredAddress();
  }, [user]);

  return (
    <AddressContext.Provider value={{ selectedAddress, setSelectedAddress }}>
      {children}
    </AddressContext.Provider>
  );
};
