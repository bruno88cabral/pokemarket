import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Header from './';

const mockUseDispatch = jest.fn();

jest.mock('react-redux', () => ({
	useDispatch: () => mockUseDispatch,
	useSelector: jest.fn()
		.mockImplementation(selector => selector({
			cart_rock: [
				{
					name: 'pokemock-1',
					value: '5.55'
				},
				{
					name: 'pokemock-2',
					value: '3.33'
				},
				{
					name: 'pokemock-3',
					value: '1.55'
				}
			]
		}))
})
);

describe('<Header />', () => {
	it('should render component', () => {
		const { getByText } = render(
			<Header type="rock" />
		);

		expect(getByText('3')).toBeDefined();
	});

	it('function -> onClickCart', () => {
		const { container } = render(
			<Header type="rock" />
		);
        
		const cartBtn = container.querySelector('.cart');
		fireEvent.click(cartBtn);

		expect(mockUseDispatch).toHaveBeenCalledWith({
			type: 'TOGGLE_CART'
		});
	});
});