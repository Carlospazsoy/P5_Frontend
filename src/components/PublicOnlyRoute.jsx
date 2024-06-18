import React, { useContext } from 'react'
import { Navigate } from 'react-router'
import { UserContext } from '../context/UserContext'

export default function PublicOnlyRoute({children}) {
  const {user} = useContext(UserContext)
  if (user.logged) {
    return <Navigate to='/' replace/> //replace es una propiedad hace que esta pagina login se retire del backstack history
    
  }  
  return children
}

// El objetivo de este componente no es visual sino lógico ejecutandose en App.jsx como una propiedad en la ruta login y en la signup, inhabilitando esas rutas si el usuario ya se logeo
