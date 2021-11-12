// == Import : npm
import { createStore, compose, applyMiddleware } from 'redux';
import axios from 'axios';
import { backendUrl } from '../config';
import { getAccountsMiddleware } from 'src/store/middlewares/getAccountsMiddleware';

// == Import : local
import reducer from './reducer';

// Ajout de l'extension devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// all axios can be used, shown in axios documentation
export const axiosConfigured = axios.create({
  baseURL: backendUrl,
  responseType: 'json',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});

const enhancers = composeEnhancers(
  applyMiddleware(
    getAccountsMiddleware,
  ),
);

const store = createStore(
  reducer,
  enhancers,
);

// == Export
export default store;