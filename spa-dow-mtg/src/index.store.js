import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import * as reducers from './index.reducers';

const Store = createStore(
  reducers.default,
  applyMiddleware(thunk, logger),
);

export default Store;
