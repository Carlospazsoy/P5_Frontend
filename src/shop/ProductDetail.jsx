import React, { useEffect, useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router';
import instance from '../api';
import { CartContext } from '../context/CartContext'; // Importar CartContext
import './ProductDetail.css';
import { UserContext } from '../context/UserContext';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

function ProductDetail() {
  const [selectedColor, setSelectedColor] = useState(null);
  const { id } = useParams(); // Obtén el ID del producto desde la URL
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext); // Obtener addToCart del contexto

  const {user} = useContext(UserContext)
  const userId = user.data._id; 
  // console.log(user);

  useEffect(() => {
    // Función para obtener los datos del producto
    const fetchProduct = async () => {

      

      try {
        const response = await instance.get(`/v1/products/${id}`);
        setProduct(response.data.data); // Asignamos el producto al estado
      } catch (error) {
        console.error('Error al obtener el producto:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(userId, product._id, 1); // Agregar producto al carrito
  };

  const handleBuyNow = () => {
    addToCart(product);
    // Redirigir a la página de pago, por ejemplo:
    window.location.href = '/v1/checkout';
  };

  if (!product) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <NavBar></NavBar>
      <div className="container mt-5">
      
      <div className="row">
        <div className="col">
          <img src={product.imageURL} width='100%' alt={product.name} />
        </div>
        <div className="col-md-6">

        <div className="row justify-content-md-center">
        <div className="">
          <div className="card p-2">
            
        <h3>{product.name}</h3>
          <p>{`Marca: ${product.brand}`}</p>
          <div className="">
            {product.colors && (
              <div className="mb-3">
                <p>Color:</p>
                <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                  {product.colors.map((color, index) => (
                    <React.Fragment key={color}>
                      <input
                        type="radio"
                        className="btn-check"
                        name="color"
                        id={`color${index}`}
                        autoComplete="off"
                        checked={selectedColor === color}
                        onChange={() => setSelectedColor(color)}
                      />
                      <label className="btn btn-outline-primary" htmlFor={`color${index}`}>
                        <img src={`path/to/${color}-thumbnail.jpg`} alt={color} width="20" height="20" />
                      </label>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
          </div>
          <p>{`Precio: $${product.price}`}</p>
          <p>{product.description}</p>

          </div>
          </div>
          </div>
          <Button variant="primary" className="me-3" onClick={handleAddToCart}>Agregar al carrito</Button>
          <Button variant="success"onClick={handleBuyNow} >Comprar ahora</Button>
        </div>
      </div>
      <hr />
      {/* <div className="text-center">
        <h4>Medios de Pago</h4>
        <img src="https://logotipoz.com/wp-content/uploads/2021/10/version-horizontal-large-logo-mercado-pago.webp" alt="Mercado Pago" className="me-3" />
        <img src="https://w7.pngwing.com/pngs/782/863/png-transparent-paypal-logo-paypal-logo-paypal-blue-text-trademark.png" alt="Paypal" />
      </div> */}
    </div>

    <Footer></Footer>
    </>
    
  );
}

export default ProductDetail;
