import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import reduxThunk from 'redux-thunk';

import './index.css';
import App from './App';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/orderReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(reduxThunk))
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
