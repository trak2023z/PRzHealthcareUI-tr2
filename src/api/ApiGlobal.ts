import axios from 'axios';

export const apiConfig = {
  headers: { Authorization: `${localStorage.getItem('token')}` }
};

export default axios.create({
  baseURL: `http://192.168.56.1:5000/`
});
