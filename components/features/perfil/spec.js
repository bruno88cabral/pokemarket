import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import Router from 'next/router';
import axios from 'axios';
import Perfil from './';

//mocks
Router.router = {
	push: jest.fn()
};

jest.spyOn(window.localStorage.__proto__, 'setItem');
window.localStorage.__proto__.setItem = jest.fn();

let mockUseDispatch = jest.fn();

jest.mock('react-redux', () => ({
	useDispatch: () => mockUseDispatch,
})
);

jest.mock('axios');

const pokemock = {
	name: 'misdreavus',
	height: 7,
	weight: 10,
	id: 200,
	abilities: [
		{
			ability: {
				name: 'tormenta'
			}
		}
	],
	types: [ 
		{
			type: {
				name: 'ghost'
			}
		},
		{
			type: {
				name: 'rock'
			}
		}
	],
	stats: [
		{
			base_stats: 60,
			stat: {
				name: 'HP'
			}
		},
		{
			base_stats: 80,
			stat: {
				name: 'Attack'
			}
		},
		{
			base_stats: 105,
			stat: {
				name: 'Defense'
			}
		},
		{
			base_stats: 32,
			stat: {
				name: 'Special-Attack'
			}
		},
		{
			base_stats: 89,
			stat: {
				name: 'Especial-Defense'
			}
		},
		{
			base_stats: 140,
			stat: {
				name: 'Speed'
			}
		}
	]

};

//tests
describe('<Perfil />', () => {
	beforeEach(() => {
		axios.get.mockResolvedValueOnce({ 
			data: pokemock,
			error: false,
			loading: false
		});
	});
	it('should render component', () => {
		const { getByText } = render(
			<Perfil
				code="57"
				type="dark"
			/>
		);

		waitFor(() => {
			expect(getByText('Misdreavus')).toBeDefined();
			expect(getByText('Especial-Defense')).toBeDefined();
			expect(getByText('Rock')).toBeDefined();
			expect(getByText('Tormenta')).toBeDefined();
		});   
	});

	it('function -> onClickAdd()', async () => {
		const { getByText } = render(
			<Perfil
				code="57"
				type="dark"
			/>
		);

		const add = await waitFor(() => getByText('Add to Cart'));
		fireEvent.click(add);

		waitFor(() => {
			expect(
				getByText('The product was successfully added to the cart')
			).toBeDefined();

			expect(mockUseDispatch).toHaveBeenCalledWith({
				type: 'CART_DARK_RESULT',
				payload: [{
					name: pokemock.name,
					value: ''
				}]
			});
		});
	});

	it('should show modal and click in primary btn', async () => {
		const { getByText } = render(
			<Perfil
				code="57"
				type="dark"
			/>
		);

		const add = await waitFor(() => getByText('Add to Cart'));
		fireEvent.click(add);

		const keepBuying = await waitFor(() => getByText('Keep buying'));
		fireEvent.click(keepBuying);

		expect(Router.router.push).toHaveBeenCalledWith('/marketplace/dark');
	});

	it('should show modal and click in secundary btn', async () => {
		const { getByText } = render(
			<Perfil
				code="57"
				type="dark"
			/>
		);

		const add = await waitFor(() => getByText('Add to Cart'));
		fireEvent.click(add);

		const keepBuying = await waitFor(() => getByText('Checkout'));
		fireEvent.click(keepBuying);

		expect(Router.router.push).toHaveBeenCalledWith('/cart/dark');
	});
});