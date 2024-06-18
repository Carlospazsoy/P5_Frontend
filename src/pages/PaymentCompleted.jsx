import React from 'react'
import {Link} from 'react-router-dom'

export default function PaymentCompleted() {
  return (
    <div>
      <p>Gracias por tu compra 😍</p>
      <Link to="/">Seguir comprando</Link>
    </div>
  )
}
