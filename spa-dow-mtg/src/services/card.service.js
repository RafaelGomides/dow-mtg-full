import request from "./request.service";

/**
 * Sets the request service
 **/
const api = new request();

let data = {};

const getOneCard = (id, query = {}) => {
	return api.get(`cards/${id}`, query);
};

const getCards = (id, query = {}) => {
	return api.get(`cards`, query);
};

const setCard = (data, query = {}) => {
	return api.post(`cards`, data, query);
};

export const cardService = {
	data,
	getOneCard,
	getCards,
	setCard,
};
