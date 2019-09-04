/* Constant */
import { CARD } from "../constants/card.constant";

const initialState = {
    error: null,
    card: null,
};

/* Export Reducer */
const card = (state = initialState, action) => {

    switch (action.type) {
        case CARD.CARD_SUCCESS:
        console.log('action reducer :', action);
            return {
                ...state,
                card: action.data,
            };

        case CARD.CARD_FAILURE:
            return {
                ...state,
                card: null,
                error: action.error,
            };

        default:
            return state;
    }
};

/* Export Reducer */
export default card;
