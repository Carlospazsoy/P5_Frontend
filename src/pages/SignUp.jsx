import React, { useState } from 'react'
import LoadingButton from '../components/LoadingButton'
import instance from '../api';
import { Link } from 'react-router-dom';

export default function SignUp() {
  const [register, setRegister] = useState({
    success: false,
    user: {}
  });
  const [loading, setLoading] = useState(false);
  
  const signup = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      /* newUser es una response */
      const newUser = await instance.post("/v1/auth/signup", {
        name: event.target.name.value,
        lastName: event.target.lastName.value,
        email: event.target.email.value,
        password: event.target.password.value,
      });
        // si obtienes respuesta de la solcitud se creaeste estado que a su vez condiciona la renderizacion de exito
      setRegister({
        success: true,
        user: newUser.data.data
      });
      console.log(register);
      
      //El redireccionamiento va aquí
  
    } catch (error) {
      console.log("Error al registrar usuario", error);
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <>
      <div className="signup-container">
        <h1>Sign up</h1>
        <form onSubmit={signup}>
          <input type="text" name='name' placeholder='Name' />
          <input type="text" name='lastName' placeholder='Last name' />
          <input type="email" name='email' placeholder='Email' />
          <input type="password" name='password' placeholder='Password' />
          <LoadingButton loading={loading}>Sign Up</LoadingButton>
        </form>
        {register.success && <p>Usuario registrado exitosamente</p>}

        <Link to='/v1/login'>Iniciar sesión</Link>
      </div>
    </>
  );
}
