import { GET_ORDERS_BY_VENDOR_ID } from '../VendorPages/VendorOrders/VendorOrdersPage';


const INITIAL_STATE = {
  incomingOrders: [],
  completedOrders: [],
  startDate: new Date().getTime() - 7 * 86400000,
  endDate: new Date().getTime(),
};

export const SET_CALENDAR_TIMES = 'SET_CALENDAR_TIMES';

function vendorOrders(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ORDERS_BY_VENDOR_ID: {
      const orders = [...action.data];
      const incomingOrders = orders.filter(o => o.status === 'PAID');
      const completedOrders = orders.filter(o => o.status === 'READY' || o.status === 'DELIVERED');
      return {
        ...state,
        incomingOrders,
        completedOrders,
      };
    }
    case SET_CALENDAR_TIMES: {
      return {
        ...state,
        ...action.data,
      };
    }
    default: return state;
  }
}

export default vendorOrders;
