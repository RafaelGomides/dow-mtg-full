import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import * as Reducers from './index.reducers';

const Store = createStore(
  Reducers.default,
  applyMiddleware(thunk, logger),
);

export default Store;
