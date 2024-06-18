import React, { createContext, useEffect, useState } from 'react';
import instance from '../api';

// 1. Creacion del contexto, se renderiza aqui
export const UserContext = createContext();

// 2. Definición de funcion principal, se renderiza en main.jsx
export default function UserProvider({ children }) {
  const [user, setUser] = useState({
    logged: false,
    data: {},
    fetching: true
    // s24 esta seria una variable que apunta al momento que sucede mili segundos cuando se esta buscando el usaurio en el localstorage
  });
  // console.log(user);

  useEffect(()=> { /* permite que recarguemos l pagina sin perder la sesion iniciada, se ejecuta como prioridad al ejecuar la app*/
  /* instance almacena la url del backend */

    instance.get('/v1/auth/recover', { // ruta recover se tuvo que programar en el backend para facilitar el proceso de recuperar me parece que del token(las credenciales del usuario) y no perder la sesion
      headers: {
        // El standard de autenticacion reuiere que se concatene el string Bearer con un espacio y el token de autenticacion
        Authorization: 'Bearer ' + localStorage.getItem('token'), 
      },
    })
    /* manejo de errores y de exito empleando el setUser del useState  */
      .then((response) => {
        setUser({
          logged: true,
          data: response.data.data,
          fetching: false
        });
      })
      .catch((error) => {
        console.log(error);
        setUser({
          logged: false,
          data:{},
          fetching: false
        })
      });
  }, []);  // atencion a la sintaxis de la dependencia vacia [], esto indica que solo se ejecuta una vez


  // #4 Uso del contexto.  pasarle al proveedor los valores de user y setuser para lograr tanto acceder como actualizar la info en login.jsx 
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
      {/* con children se refiere a los componentes de renderizado que habra entre las etiquetas de UserProvider en el main.jsx */}
    </UserContext.Provider> 
  );
}

/* Componente utilizado en Login */

// El objetivo de este componente es extraer el token de login del localstorage , con prioridad de ejecucion usando useEffect, capacidad de almacenamiento en nuestro codigo con useState y con capacidad de persistencia utilisando el UserContext.Provider con alcance global en el proyecto.
