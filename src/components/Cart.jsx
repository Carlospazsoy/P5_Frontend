  // import React, { useContext, useEffect } from 'react';
  import { CartContext } from '../context/CartContext';
  import { Button } from 'react-bootstrap';
  import { UserContext } from '../context/UserContext';
  import { useContext, useEffect } from 'react';
  import Footer from './Footer';
  // import '../components/Cart.css';



  // Simulamos obtener el userId, en la práctica obtendrías esto del contexto de usuario o autenticación
  // const userId1 = '6660eb493542b81a937535c4';

  const Cart = () => {

    const {user} = useContext(UserContext)
    const { cart, fetchCart, updateCartItemQuantity, removeFromCart } = useContext(CartContext);
    
    // console.log(user);
    const userId = user.data._id; 
    // console.log(user.data._id)

    // console.log(cart);
    useEffect(() => {
      if (user && user.data && user.data._id) {
        fetchCart(user.data._id); // Obtener los elementos del carrito cuando el componente se monta
      }
    }, [user]); //fetchCart se ejecuta sol cuando userId cambia, colocar fetchCart dentro de las dependencias generó un bucle infinito

    const handleQuantityChange = (cartItemId, quantity) => {
      if (quantity <= 0) {
        removeFromCart(cartItemId);
      } else {
        updateCartItemQuantity(cartItemId, quantity);
      }
    };

    const handleRemove = (cartItemId) => {
      removeFromCart(cartItemId);
    };

    const handleProceedToCheckout = () => {
      // Aquí puedes redirigir a la página de checkout o realizar cualquier lógica adicional
      window.location.href = '/v1/checkout'
    
    };
    if (!userId) {
      return <div className="container mt-5">Cargando...</div>;  // O algún otro indicador de carga
    }

    if (cart.length === 0) {
      return <div className="container mt-5">Tu carrito está vacío</div>;
    }

    return (
      <>
      <div className="container mt-5">
        <h1>Carrito de compras</h1>
        <ul className="list-group">
          {cart.map((item) => (
            <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
              <div className='col-9'>
                <img src={item.product.imageURL} alt={item.product.name} width="50" className="me-3" />
                {item.product.name} - ${item.product.price}
              </div>
              <div>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                  className="form-control d-inline-block me-3"
                  style={{ width: '60px' }}
                />
                <Button variant="danger" onClick={() => handleRemove(item._id)}>Eliminar</Button>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-3">
          <h3>Total: ${cart.reduce((total, item) => total + item.product.price * item.quantity, 0)}</h3>
          <Button variant="success" onClick={handleProceedToCheckout}>Proceder al Checkout</Button>
        </div>
      </div>
        <Footer></Footer>
      </>
    );
  };

  export default Cart;
