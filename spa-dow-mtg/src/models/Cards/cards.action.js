import DefaultSystem from '../Default/default.actions';
import { Action } from './cards.constants';

class Cards extends DefaultSystem {
  constructor({
    _id = 0,
    name = "",
	  mana_cost = {
	  	red: 0,
	  	green: 0,
	  	blue: 0,
	  	white: 0,
	  	black: 0,
	  	any: 0
	  },
	  type = "",
	  spells = [],
	  atkdef = "",
	  description = ""
  }) {
    super({});
    this._id = _id;
    this.name = name;
    this.mana_cost = mana_cost;
    this.type = type;
    this.spells = spells;
    this.atkdef = atkdef;
    this.description = description;
    this.serverPath = 'cards/'
    this.action = {
      select: Action.selectMany,
      save: Action.save,
      delete: Action.delete,
      update: Action.update,
    };
  };
}

function SaveCard(card = {}) {
  const newCard = new Cards(card);
  delete newCard._id;
  return newCard.save();
}

function GetAllCards() {
  const newCard = new Cards({});
  return newCard.select();
}

function SelectCard(card = {}) {
  const newCard = new Cards(card);
  return newCard.selectCard();
}

function DeleteCard(card = {}) {
  const newCard = new Cards(card);
  return newCard.delete();
}

function UpdateCard(card = {}) {
  const newCard = new Cards(card);
  return newCard.update();
}

export {
  Cards,
  SaveCard,
  GetAllCards,
  SelectCard,
  DeleteCard,
  UpdateCard,
};
