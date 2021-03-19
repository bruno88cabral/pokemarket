import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Card from './';

let mockUseDispatch = jest.fn();

const pokemock = {
	name: 'Pokemock',
	value: '9.99'
};

jest.mock('react-redux', () => ({
	useSelector: jest.fn()
		.mockImplementation(selector => selector({
			cart_ghost: [pokemock]
		})),
	useDispatch: () => mockUseDispatch
})
);

jest.spyOn(window.localStorage.__proto__, 'setItem');
window.localStorage.__proto__.setItem = jest.fn();

describe('<Card />', () => {
	it('should and the component', () => {
		const { getByText } = render(
			<Card 
				name="Gastly"
				value="3.78"
				type="ghost"
				code="420"
			/>
		);
        
		expect(getByText('Gastly')).toBeDefined();
		expect(getByText('US$ 3.78')).toBeDefined();
	});

	it('should click in add to cart button, save in local state and update local storage', () => {
		const name = 'Gastly';
		const value = '3.78';
		const { container } = render(
			<Card 
				name={name}
				value={value}
				type="ghost"
				code="420"
			/>
		);

		const button = container.querySelector('button');
		fireEvent.click(button);
        
		expect(mockUseDispatch).toHaveBeenCalledWith({
			type: 'CART_GHOST_RESULT',
			payload: [{ name, value }]
		});

		// eslint-disable-next-line no-undef
		expect(global.localStorage.setItem).toHaveBeenCalledWith(
			'cart-ghost',
			JSON.stringify([
				pokemock,
				{ name, value }
			])
		);
	});
});