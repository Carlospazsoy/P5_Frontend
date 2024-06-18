import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'

export default function UserData() {
  // el hook useContext conecta con la propiedad value UserContext y extraemos user de manera desestructurada
    const {user} = useContext(UserContext)
  return (
    <div>
        Logged: {user.logged ? user.data.name + ' ' + user.data.lastName: 'Not logged'} {/* Viene del state */}
    </div>
  )
}

// El objetivo de este componente es mostra en pantalla algo como: Logged: Carlos