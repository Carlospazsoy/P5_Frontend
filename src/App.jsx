import React from 'react';

// import de bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';

import { Routes, Route } from 'react-router-dom';
import Home from  './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';
import Contacto from './pages/Contacto';
import Galeria from './pages/Galeria';

import PerfilUsuario from './pages/UserProfile';
import CheckoutRespaldo from './pages/CheckoutRespaldo';

//Imports de shop
import Product1 from './shop/ProductDetail';
import PaymentCompleted from './pages/PaymentCompleted';
import UserProfile from './pages/UserProfile';
import PublicOnlyRoute from './components/PublicOnlyRoute';
import PrivateRoute from './components/PrivateRoute';
import AddProduct from './pages/AddProduct';
import ProtectedRoute from './components/ProtectedRoute';
import ForgottenPassword from './pages/ForgottenPassword';
import ChangePassword from './pages/ChangePassword';
import Tienda from './pages/Tienda';
import UserAddresses from './pages/UserAddresses';
import ProductDetail from './shop/ProductDetail';
import Cart from './components/Cart';
import Checkout from './pages/Checkout';



// import HomeCategory from './shop/Categories/HomeCategory';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/v1/login' element={<PublicOnlyRoute> <Login/> </PublicOnlyRoute>} /> {/* opcion 1 de sintaxis */}
        <Route path='/v1/signup' element={<PublicOnlyRoute children={<SignUp/>}/>} />      {/* opcion 2 de sintaxis */}
        <Route path='/v1/contacto' element={<Contacto/>} />
        <Route path='/v1/galeria' element={<Galeria/>} />
        <Route path='/v1/perfil' element={<UserProfile/>}></Route>
        <Route path='/v1/domicilio' element={<UserAddresses/>}></Route>
        <Route path='/v1/cart/checkoutRespaldo' element={<PrivateRoute children={<CheckoutRespaldo/>}/>}></Route>
        <Route path='/v1/cart/complete' element={<PaymentCompleted/>}></Route>
        <Route path='v1/tienda' element={<Tienda/>}></Route>
        <Route path='v1/tienda/:id' element={<ProductDetail/>}></Route>
        <Route path='v1/forgotten-password' element={<ForgottenPassword/>}></Route>
        <Route path='v1/forgotten-password/change-password' element={<ChangePassword/>}></Route>
        <Route path='v1/admin/products/add' element={<ProtectedRoute allowedRoles={['ADMIN', 'EDITOR']}> <AddProduct/> </ProtectedRoute>}></Route> 
        <Route path='v1/cart' element={<Cart/>}></Route>
        <Route path='v1/checkout' element={<Checkout/>}></Route>
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </>
  );
}

export default App;
