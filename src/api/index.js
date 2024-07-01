// Esta carpeta bien podria llamarse config
// configuramos la url de nuestro backend que ahora que esta desplegada se ha convertido en un API 
import axios from 'axios'

const instance = axios.create({
  // baseURL: 'https://api-auth-3uh2.onrender.com'
  // baseURL: 'http://localhost:4000'
  baseURL: 'https://p5-backend-9n4z.onrender.com'

})

// Muestra la URL base en la consola
console.log(`> backend ${instance.defaults.baseURL}`);

// instance contiene todos los metodos de axios
export default instance


/* El objetivo de este componente es establecer conexion con el backend que ahora que esta desplegado podemos llamarle api */
