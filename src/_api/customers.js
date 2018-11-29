import axios from 'axios';
import { BACKEND_SERVER } from './constants';

const BASE_URL = `${BACKEND_SERVER}/customers`;

const api = axios.create({
  baseURL: BASE_URL,
  responseType: 'json',
  timeout: 10000,
  contentType: 'application/json',
});

const orders = () => api.get('orders', {
  headers: { Authorization: JSON.parse(localStorage.getItem('user')).token },
});

const addItemToCart = req => api.post('addItemToCart', { ...req }, {});

const setCollected = id => api
  .get(
    'setCollected',
    { params: { id } },
  );

export default {
  orders,
  addItemToCart,
  setCollected,
};
