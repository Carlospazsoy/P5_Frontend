import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'; // Solo necesitas importar Button una vez
import instance from '../api';

export default function ForgottenPassword() {
  const [error, setError] = useState(null); // Inicializa error como null en lugar de undefined
  const [successMessage, setSuccessMessage] = useState(false);

  const sendCode = async (event) => {
    event.preventDefault();
    
    const email = event.target.email.value;

    if (!email) {
      setError('Por favor, introduce tu dirección de correo electrónico.');
      setSuccessMessage(false);
      return;
    }
    console.log("Correo electrónico enviado al backend:", email);

    try {
      const response = await instance.post("/v1/auth/password_recovery", {
        email: email,
        
      });
      console.log("Respuesta del servidor:", response.data);
      // Mostrar mensaje de éxito
      setSuccessMessage('Listo, verifica tu bandeja de entrada. El correo puede estar en la bandeja de spam.');
      setError(null);
    } catch (error) {
      console.error('Error en el envio de código de recuperación: ' + error);
      setError('Se produjo un error al enviar el código de recuperación. Por favor, inténtalo de nuevo más tarde. Algunas causas comunes son la expirción del código o utilizar la misma contraseña ');
      setSuccessMessage(false);
    }
  }

  return (
    <>
      <h2>Te enviaremos un código de recuperación</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={sendCode}>
        <input type="email" name='email' placeholder='Escribe tu email' />
        <Button type="submit" variant='primary'>Enviar</Button>
      </form>
    </>
  )
}
