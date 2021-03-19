/* eslint-disable no-case-declarations */
import { combineReducers } from 'redux';

const pokemon_ice = (state = [], { type, payload }) => {
	switch (type) {
	case 'POKEMON_ICE_RESULT':
		return payload;
	default:
		return state;
	}
};

const pokemon_dark = (state = [], { type, payload }) => {
	switch (type) {
	case 'POKEMON_DARK_RESULT':
		return payload;
	default:
		return state;
	}
};

const pokemon_rock = (state = [], { type, payload }) => {
	switch (type) {
	case 'POKEMON_ROCK_RESULT':
		return payload;
	default:
		return state;
	}
};

const pokemon_ghost = (state = [], { type, payload }) => {
	switch (type) {
	case 'POKEMON_GHOST_RESULT':
		return payload;
	default:
		return state;
	}
};

const cart_ice = (state = [], { type, payload }) => {
	switch (type) {
	case 'CART_ICE_RESULT':
		let stateCart = state;
		let cart = [...stateCart, ...payload];
		return cart;
	case 'CART_ICE_CLEAN':
		return [];
	default:
		return state;
	}
};

const cart_dark = (state = [], { type, payload }) => {
	switch (type) {
	case 'CART_DARK_RESULT':
		let stateCart = state;
		let cart = [...stateCart, ...payload];
		return cart;
	case 'CART_DARK_CLEAN':
		return [];
	default:
		return state;
	}
};

const cart_rock = (state = [], { type, payload }) => {
	switch (type) {
	case 'CART_ROCK_RESULT':
		let stateCart = state;
		let cart = [...stateCart, ...payload];
		return cart;
	case 'CART_ROCK_CLEAN':
		return []; 
	default:
		return state;
	}
};

const cart_ghost = (state = [], { type, payload }) => {
	switch (type) {
	case 'CART_GHOST_RESULT':
		let stateCart = state;
		let cart = [...stateCart, ...payload];
		return cart;
	case 'CART_GHOST_CLEAN':
		return [];
	default:
		return state;
	}
};

const cart_group_ghost = (state = [], { type, payload }) => {
	switch (type) {
	case 'CART_GROUP_GHOST_RESULT':
		return payload;
	case 'CART_GROUP_GHOST_CLEAN':
		return [];
	default:
		return state;
	}
};

const cart_group_ice = (state = [], { type, payload }) => {
	switch (type) {
	case 'CART_GROUP_ICE_RESULT':
		return payload;
	case 'CART_GROUP_ICE_CLEAN':
		return [];
	default:
		return state;
	}
};
const cart_group_dark = (state = [], { type, payload }) => {
	switch (type) {
	case 'CART_GROUP_DARK_RESULT':
		return payload;
	case 'CART_GROUP_DARK_CLEAN':
		return [];
	default:
		return state;
	}
};
const cart_group_rock = (state = [], { type, payload }) => {
	switch (type) {
	case 'CART_GROUP_ROCK_RESULT':
		return payload;
	case 'CART_GROUP_ROCK_CLEAN':
		return [];
	default:
		return state;
	}
};

const toggle_cart = (state = false, {type}) => {
	switch(type) {
	case 'TOGGLE_CART':
		return !state;
	default:
		return state;
	}
};

const Reducers = combineReducers({
	pokemon_ice,
	pokemon_dark,
	pokemon_ghost,
	pokemon_rock,
	cart_ice,
	cart_ghost,
	cart_rock,
	cart_dark,
	cart_group_ice,
	cart_group_ghost,
	cart_group_rock,
	cart_group_dark,
	toggle_cart
});

export default Reducers;
