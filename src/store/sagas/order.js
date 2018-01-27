import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';

import * as actions from '../actions';

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart());

  try {
    const response = yield axios.post(
      '/orders.json?auth=' + action.token,
      action.orderData
    );
    yield put(
      actions.purchaseBurgerSuccess(response.data.name, action.orderData)
    );
  } catch (error) {
    yield put(actions.purchaseBurgerFail(error));
  }
}

export function* fetchOrdersSaga(action) {
  const queryParams =
    '?auth=' +
    action.token +
    '&orderBy="userId"&equalTo="' +
    action.userId +
    '"';
  yield put(actions.fetchOrdersStart());

  try {
    const res = yield axios.get('/orders.json' + queryParams);
    const fetchedOrders = [];
    for (let key in res.data) {
      fetchedOrders.push({
        ...res.data[key],
        id: key
      });
    }
    yield put(actions.fetchOrdersSuccess(fetchedOrders));
  } catch (e) {
    yield put(actions.fetchOrdersFail(e));
  }
}
