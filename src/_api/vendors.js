import axios from 'axios';
import { BACKEND_SERVER } from './constants';

const BASE_URL = `${BACKEND_SERVER}/vendors`;

const api = axios.create({
  baseURL: BASE_URL,
  responseType: 'json',
  timeout: 10000,
  contentType: 'application/json',
});

const createVendor = vendorDetails => api
  .post(
    'createVendor',
    { ...vendorDetails },
    {},
  );

const createNewItem = (name, price, file, fileId, dishTypeId, vendorId, storeId) => api
  .post(
    'createNewItem',
    {
      name, price, file, fileId, dishTypeId, vendorId, storeId,
    },
    {},
  );

const updateItem = (id, name, price, file, fileId, dishTypeId, vendorId, storeId) => api
  .post(
    'updateItem',
    {
      id, name, price, file, fileId, dishTypeId, vendorId, storeId,
    },
    {},
  );

const getVendorDetails = vendorId => api
  .get(
    'getVendorDetails',
    { params: { vendorId } },
  );

const getOrdersByVendorId = vendorId => api
  .get(
    'getOrdersByVendorId',
    { params: { vendorId } },
  );

const getAllCanteens = () => api
  .get(
    'getAllCanteens',
    {},
  );

const getAllDishTypes = () => api
  .get(
    'getAllDishTypes',
    {},
  );

const getVendorOrders = params => api
  .get(
    'getVendorOrders',
    { params: { ...params } },
  );

const setOrderToReady = orderId => api
  .get(
    'setOrderToReady',
    { params: { orderId, storeId: parseFloat(JSON.parse(localStorage.getItem('store')).storeId) } },
  );

const toggleStatus = () => api
  .get(
    'toggleStatus',
    { params: { storeId: parseFloat(JSON.parse(localStorage.getItem('store')).storeId) } },
  );

export default {
  createVendor,
  updateItem,
  createNewItem,
  getVendorDetails,
  getOrdersByVendorId,
  getAllCanteens,
  getAllDishTypes,
  getVendorOrders,
  setOrderToReady,
  toggleStatus,
};
