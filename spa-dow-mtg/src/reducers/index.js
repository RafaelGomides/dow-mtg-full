/* Packages */
import { combineReducers } from 'redux';

/* Reducers */
import card from './cards.reducer';

const appReducer = combineReducers({
    card,
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
}

/* Export Combined Reducers */
export default rootReducer;
