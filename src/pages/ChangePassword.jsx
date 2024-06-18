import React, { useState } from 'react';
import instance from '../api';
import LoadingButton from "../components/LoadingButton";
import { Link } from 'react-router-dom'

export default function ChangePassword() {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  
  const validatePasswords = async (event) => {
    event.preventDefault();

    const newPassword = event.target.newPassword.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      setLoading(true)
      await instance.post('/v1/auth/change_password', {
        code: event.target.code.value,
        newPassword: newPassword
      });
      
      // Lógica adicional después de cambiar la contraseña (por ejemplo, redireccionar)
      setSuccessMessage('Tu contraseña ha sido cambiada con éxito')
      setLoading(false)
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      setError('Se produjo un error al cambiar la contraseña. Por favor, inténtalo de nuevo más tarde.');
    }
  }

  return (
    <div>
      <h2>Ingresa tu código de recuperación y la nueva contraseña</h2>
      <form onSubmit={validatePasswords}>
        <input type="text" name='code' placeholder='Código de recuperación' />
        <br />
        <input type="password" name='newPassword' placeholder='Nueva contraseña' />
        <br />
        <input type="password" name='confirmPassword' placeholder='Confirma tu contraseña' />
        <br />
        {/* <Button variant='warning' type="submit">Cambiar contraseña</Button> */}
        <LoadingButton loading={loading} variant='warning' type="submit">Cambiar contraseña</LoadingButton>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {successMessage && <Link to='/v1/login'>Login</Link>}
    </div>
  )
}
