import {
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_BURGER_FAIL,
  PURCHASE_BURGER_START,
  PURCHASE_INIT,
  FETCH_ORDERS_START,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAIL
} from './types';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData
  };
};

export const purchaseBurgerFail = error => {
  return {
    type: PURCHASE_BURGER_FAIL,
    error
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: PURCHASE_BURGER_START
  };
};

export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    const req = async () => {
      try {
        const response = await axios.post(
          '/orders.json?auth=' + token,
          orderData
        );
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      } catch (error) {
        dispatch(purchaseBurgerFail(error));
      }
    };
    req();
  };
};

export const purchaseInit = () => {
  return {
    type: PURCHASE_INIT
  };
};

export const fetchOrdersSuccess = orders => {
  return {
    type: FETCH_ORDERS_SUCCESS,
    orders
  };
};

export const fetchOrdersFail = error => {
  return {
    type: FETCH_ORDERS_FAIL,
    error
  };
};

export const fetchOrdersStart = () => {
  return {
    type: FETCH_ORDERS_START
  };
};

export const fetchOrders = (token, userId) => {
  return dispatch => {
    const queryParams =
      '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    dispatch(fetchOrdersStart());
    const req = async () => {
      try {
        const res = await axios.get('/orders.json' + queryParams);
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
      } catch (e) {
        dispatch(fetchOrdersFail(e));
      }
    };
    req();
  };
};
