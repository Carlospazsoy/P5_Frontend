import React, { useContext, useState } from "react";
import instance from "../api";
import UserData from "../components/UserData";
import { UserContext } from "../context/UserContext";
import '../styles/Login.css'

// importaciones de react-bootstrap
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';  // se dejó de usar en el archivo actual para terminar usando en el componente LoadingButton
import Spinner from 'react-bootstrap/Spinner';// se dejó de usar en el archivo actual para terminar usando en el componente LoadingButton
import LoadingButton from "../components/LoadingButton";
import { Link } from "react-router-dom";

export default function Login() {
	// Gestiona que al iniciar sesion se borre el posible mensaje de error que haya suscedido por no colocar bien las credenciales en un intento previo
  const [error, setError] = useState({
    error: false,
    message: "",
  });
	// Estado que gestiona una animacion de carga, es bool que indica que por defecto no debe aparecer la animacion  ✨
	const [loading, setLoading] = useState(false)

  /* const [status, setStatus] = useState({
    error: false,
    loading: false,
    message: ''
  }) */ // Una alternativa optima es en ves de tener multiples states , mejor agrupar todos en uno solo como en este ejemplo, 

  /* Esto es el uso del context mas no su definicion */
  const { user, setUser } = useContext(UserContext); // Hook que permite acceder y actualizar  los datos del contexto, UserContext creado en folder context, la idea es crear otros como ThemeContext, LanguageContext

  const login = async (event) => {
    event.preventDefault();
    // Borrar "Credenciales no coinciden"
		setError({
			error: false,
    	message: "",
		})
    try {
			setLoading(true) // animacion activada al ejecutar login

      const response = await instance.post("/v1/auth/login", {
        email: event.target.email.value /* apunta a los datos que el usuario ingresa en la etiqueta html */,
        password: event.target.password.value,
      });

      setUser({
        logged: true,
        data: response.data.data /* 1er data es metodo del objeto y 2do data apunta al que definimos en el backend (data: userJSON)*/,
      });

			setLoading(false) // animacion desactivada al finalizar el proceso de login

      localStorage.setItem(
        "token",
        response.data.token
      ); /* sintax (key value) 3:1:00 el token se actualiza/setea en localstorage manteniendo nuestro usuario loggeado */
    } catch (error) {
      console.error("Error en el login", error);
      setError({
        error: true,
        message: error.response? error.response.data.message: "error desconocido" /* 'message' fue definido en el backend ("Credenciales no coinciden") */,
      });
			setLoading(false) // animacion desactivada al finalizar el seteo de error
    }/* finally{   //esta opcion es optima o mejor aun tener un loading context definido para todas laas paginas de una aplicación, pero si se aplica la alternativa de aplicar un solo estado no es necesario
			setLoading(false)
		} */

  };
	/* Notese que pueden haber dos returns ❗ pero solo se ejecutara el primero que se cumpla */
	// Si el usuario está autenticado, oculta el formulario

	if (user.logged) {
		return (
			<div>
				<h1>Bienvenido, {user.data.name}</h1>
				<UserData user={user}></UserData>
			</div>
		);
	}

	
  return (
    <>
      <div className="login-container">
        <h1>Login</h1>
        <UserData user={user}></UserData> {/* Ex. Logged: Carlos */}
        <form onSubmit={login}>
          <label htmlFor="email"> Correo
            <input id="mail" type="email" name="email" placeholder="Email..." />
          </label>
          <label htmlFor="password"> Password
            <input id="password" type="password" name="password" placeholder="Password..." />
          </label>
			  	{/* pasarle el prop loading dara un valor true y activara la animación */}
			  	<LoadingButton loading={loading}>Log in 🙌🏽</LoadingButton>
        </form>

			  {loading?<p>Loading ...</p>: null}  {/* monitor sencillo */}
			  {/* {loading&&<p>Loading ...</p>} */}
        {/* Alternativa al opedador ternario:
			  error.error?<p>{error.message}</p>:null */}
        {error.error && 
			  <Alert variant='danger'>
			    <p>{error.message}</p>
		    </Alert>}
        <Link to='/v1/forgotten-password'>¿Olvidaste tu contraseña?</Link>
        <p>
          ¿Aún no tienes una cuenta? <button><Link to='/v1/signup/'>Signup</Link></button>
        </p>
      </div>  
    </>
  );
}


//Version condensada d este codigo con la utilizacion de un solo estado:
/* import React, { useContext, useState } from 'react'
import instance from '../api'
import UserData from '../components/UserData'
import { UserContext } from '../context/UserContext'
import Alert from 'react-bootstrap/Alert';
import FormButton from '../components/FormButton';

export default function Login() {
    // const [error, setError] = useState({
    //     error:false,
    //     message: ''
    // })
    // const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState({
        error: false,
        loading: false,
        message: ''
    })

    const {user, setUser} = useContext(UserContext)// Hook que permite acceder a los datos del contexto

    const login = async (event)=>{
        event.preventDefault()
        setStatus({
            error: false,
            loading: true,
            message: ''
        })
        try {
            const response = await instance.post('/api/auth/login',{
                email:event.target.email.value,
                password:event.target.password.value
            })

            setUser({
                logged:true,
                data: response.data.data
            })
            localStorage.setItem('token', response.data.token )
            setStatus({
                error: false,
                loading: false,
                message: ''
            })
        } catch (error) {
            setStatus({
                error: true,
                loading: false,
                message: error.response.data.message
            })
        }
    }
  return (
    <div>
        <h1>Login</h1>
        <UserData user={user}></UserData>
        <form onSubmit={login}>
            <input type="email" name="email" placeholder='Email...' />
            <input type="password" name="password" placeholder='Password...' />
            <FormButton loading={status.loading}>Login</FormButton>
        </form>
        {status.error&&<Alert variant="danger">
            {status.message}
        </Alert>}
    </div>
  )
} */