// == Import : npm
import { createStore, compose, applyMiddleware } from 'redux';
import axios from 'axios';
import { backendUrl } from '../config';

// == Import : local
import reducer from './reducer';

// Ajout de l'extension devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// all axios can be used, shown in axios documentation
const client = axios.create({
  baseURL: backendUrl,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/ld+json; charset=utf-8',
  },
});

const enhancers = composeEnhancers(
  applyMiddleware(
  ),
);

const store = createStore(
  reducer,
  enhancers,
);

// == Export
export default store;