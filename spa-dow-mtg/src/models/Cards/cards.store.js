import { Cards } from './cards.action';
import { Action } from './cards.constants';

const initialState = {
  selected: new Cards({}),
  list: [],
};

const CardsStore = (state = initialState, action) => {
  switch (action.type) {
    case `${Action.selectMany}_SUCCESS`: {
      return {
        ...state,
        list: [ ...action.payload.data ],
      }
    }
    case `${Action.selectMany}_FAIL`: {
      return {
        ...state,
      }
    }
    case `${Action.selectOne}_SUCCESS`: {
      return {
        ...state,
      }
    }
    case `${Action.selectOne}_FAIL`: {
      return {
        ...state,
      }
    }
    case `${Action.save}_SUCCESS`: {
      return {
        ...state,
      }
    }
    case `${Action.save}_FAIL`: {
      return {
        ...state,
      }
    }
    case `${Action.update}_SUCCESS`: {
      return {
        ...state,
      }
    }
    case `${Action.update}_FAIL`: {
      return {
        ...state,
      }
    }
    case `${Action.delete}_SUCCESS`: {
      return {
        ...state,
      }
    }
    case `${Action.delete}_FAIL`: {
      return {
        ...state,
      }
    }
    default: {
      return state;
    }
  }
}

export default CardsStore;
