import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'

export default function Logout() {
  /* el user de Logout adquiere el valor definido en el user de UserContext al iniciar sesion. Sin embargo sucede lo mismo inversamente y si actualizamos el user en este componente de Logout este se actulizara tambien en el use del compoente UserContext posibiltando el cierre de sesion con un alcance en toda la aplicación*/
  const {user, setUser} = useContext(UserContext)

  /* borrar el token del local storage */
  const logout = () => { 
    localStorage.removeItem('token')
    setUser({
      logged: false,
      data: {}
    })
  }



  return (
    <div>
      {/* Se implementa una condicional en la conciencia de que user es un objeto con la propiedad logged. En caso true dispara el evento relacionado a la funcion logout */}
      {user.logged?<button className='btn btn-primary mt-3' onClick={logout}>Cerrar sesión</button>: <p>No iniciaste sesión todavia</p>}
    </div>
  )
}

/* El objetivo de este componente es cerrar sesion al eliminar el token del localstorage */