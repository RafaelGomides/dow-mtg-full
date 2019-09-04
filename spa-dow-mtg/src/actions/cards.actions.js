/* Constant */
import { CARD } from '../constants';

/* Service */
import { cardService } from '../services';

const failure = (actionType, error) => {
    return {
        type: actionType,
        error: error,
    };
};

const getCard = () => {
    const success = data => {

        console.log('action :', data);
        return {
            type: CARD.CARD_SUCCESS,
            data: data,
        };
    };

    return dispatch => {
        cardService.getCards().then(
            response => {
                dispatch(success(response.data));
            },
            error => {
                dispatch(failure(CARD.CARD_FAILURE, error));
            },
        );
    };
};


/* Export Redux Actions */
export const cardActions = {
    getCard,
};
