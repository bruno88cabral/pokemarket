import { createStore } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import Reducers from '../reducers';
 
const initialState = {
	pokemon_ice: [],
	pokemon_dark: [],
	pokemon_ghost: [],
	pokemon_rock: [],
	cart_ice: [],
	cart_ghost: [],
	cart_rock: [],
	cart_dark: [],
	toggle_cart: false
};

const makeStore = () => createStore(Reducers);

export const wrapper = createWrapper(makeStore, initialState);

