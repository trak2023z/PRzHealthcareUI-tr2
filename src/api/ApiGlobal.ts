import axios from 'axios';

export const apiConfig = {
  headers: { Authorization: `${localStorage.getItem('token')}` }
};

export default axios.create({
  baseURL: `http://192.168.5.143:5000/`
});
