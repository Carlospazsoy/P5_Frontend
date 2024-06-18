// LoadingButton.js
import React from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
/* nos ahorramos tener que escribir cosas como props.loading con esta forma */
const LoadingButton = ({ loading, onClick, children }) => (
  <Button variant="primary" type="submit" disabled={loading} onClick={onClick}> 
  {/* disabled respon de al valor bool de loading
  type le indica al boton que detone funciones cuando se envia
  onclick asocia un evento que detona el submit al dar click */}
    {loading && (
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
    )}
    <span>{loading ? 'Loading' : children}</span>
  </Button>
);

export default LoadingButton;

