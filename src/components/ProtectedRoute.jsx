import React from 'react'
import { UserContext } from '../context/UserContext'
import { useContext } from 'react'
import { Navigate } from 'react-router'

export default function ProtectedRoute({children, allowedRoles}) { //allowedRoles es un arreglo de roles ex:["ADMIN", "EDITOR", "REGULAR"]
  const {user}= useContext(UserContext)
  if (user.fetching) {  // fetchig es un una propiedad que sirve de bandera y se define manualmente en el state del context
    return <h1>Loading ...</h1> // colocó un return con una instruccion qu muestre Loading ... esto se supone que evito la redireccion antes de que el usuario se cargue en el contexto,
  }else if (!allowedRoles.includes(user.data.role)) {  // Si los roles defnidosd (en app.jsx) no son ninguno de los definidos en el documento de usuario, no le des acceso y redireccionalo al inicio
    return <Navigate to='/'/>
  }
  return children //sera el AddProduct
}

// este es un componente lógico mas no visual 
// el objetivo de este componente es redireccionar a una pagina cuando el usuario no tenga el role necesario para mirar ese contenido
// Este componente sera una propiedad de la ruta v1/admin/products/add'