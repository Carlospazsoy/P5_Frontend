// CleanCategory.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardProduct from '../../components/CardProduct'; // Ajusta la ruta según tu estructura de archivos
import instance from '../../api';

function ClothesCategory() {
  const [products, setProducts] = useState([]);
  // const clothesCategoryId = '6663b969dc410cf9110f662c';
  const clothesCategoryId = '666cf2372de00f982ef8ee8a';
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await instance.get(`/v1/categories/${clothesCategoryId}`);
        // console.log(response);
        setProducts(response.data.data.products || []); // Asegúrate de que sea un array
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [clothesCategoryId]); // Añade esta dependecia para que el effecto y su solicitud se ejecute las veces que sea necesario

  return (
    <div className="container">
      <h3>Clothes</h3>
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

export default ClothesCategory;
