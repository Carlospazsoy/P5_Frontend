
import React, { createContext, useState, useEffect, useContext } from 'react';
import instance from '../api';
import { UserContext } from './UserContext';
// Crear el contexto
export const CartContext = createContext();
// Proveedor del contexto
export const CartProvider = ({ children, userId_NotUsedForCaution }) => { // DUDA EXISTENCIAL: como es que el userId siendo undefined permitia la ejecucion correcta del codigo
  const [cart, setCart] = useState([]);
  const { user, setUser } = useContext(UserContext);
  
  const userId = user.data._id
  
  
  // Usar useEffect para cargar el carrito cuando el userId cambia
  useEffect(() => {
    if (userId) {
      fetchCart(userId);
    }
  }, [userId]);
  // Función para obtener el carrito del usuario
  const fetchCart = async (userId) => {    
    if (!userId) {
      console.warn('fetchCart called with undefined userId');
      return;  // Asegurar que no se hace nada si la llamada a userId es undefined
    }
    try {
      const response = await instance.get(`/v1/cart/${userId}`);
      setCart(response.data.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };
  const addToCart = async (userId, productId, quantity) => {
    try {
      const response = await instance.post('/v1/cart/add', { userId, productId, quantity });
      setCart((prevCart) => [...prevCart, response.data.data]);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };
  const updateCartItemQuantity = async (cartItemId, quantity) => {
    try {
      const response = await instance.put(`/v1/cart/update/${cartItemId}`, { quantity });
      setCart((prevCart) => prevCart.map(item => item._id === cartItemId ? response.data.cartItem : item));
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
    }
  };
  const removeFromCart = async (cartItemId) => {
    try {
      await instance.delete(`/v1/cart/remove/${cartItemId}`);
      setCart((prevCart) => prevCart.filter(item => item._id !== cartItemId));
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };
  // console.log(userId);
  return (
    <CartContext.Provider value={{ cart, fetchCart, addToCart, updateCartItemQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};