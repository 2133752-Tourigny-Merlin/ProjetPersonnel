import axios from 'axios';

/**
 * Fonction Axios qui importe le backend
 */
const Axios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default Axios;
