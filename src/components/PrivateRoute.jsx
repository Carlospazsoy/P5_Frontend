import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Navigate } from 'react-router'

export default function PrivateRoute({children}) {
  const {user} = useContext(UserContext)
  if (!user.logged) {
    return <Navigate to="/v1/login" replace/>
  }
  return children  // representa el hijo que se le de en app.jsx
}

// Si el usuario no esta logeado se redirecciona a la ruta de login , esta pensado para usarse en la rut decheckout
