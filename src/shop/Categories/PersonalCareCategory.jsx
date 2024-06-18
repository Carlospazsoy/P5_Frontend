// PersonalCareCategory.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardProduct from '../../components/CardProduct'; // Ajusta la ruta según tu estructura de archivos
import instance from '../../api';

function PersonalCare() {
  const [products, setProducts] = useState([]);
  //Desarrollo
  // const personalCareCategoryId = '6663b994dc410cf9110f6632';
  //Produccion
  const personalCareCategoryId = '666cf1c12de00f982ef8ee82';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await instance.get(`/v1/categories/${personalCareCategoryId}`);
        // console.log(response);
        setProducts(response.data.data.products || []); // Asegúrate de que sea un array
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [personalCareCategoryId]);
    
   

  
  return (
    <div className="personalCareCategory-container container">
        <h3>Personal Care</h3>
      <div className="row">
        {products.map((product) => (
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
  );
}

export default PersonalCare;
