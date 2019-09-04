import { combineReducers } from 'redux';
import * as Cards from './models/Cards/cards.store';

const Reducers = combineReducers({
  cardsState: Cards.default,
});

export default Reducers;
