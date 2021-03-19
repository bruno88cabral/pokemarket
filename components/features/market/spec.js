import React from 'react';
import { render, waitFor } from '@testing-library/react';
import axios from 'axios';
import Market from './';

jest.spyOn(window.localStorage.__proto__, 'setItem');
window.localStorage.__proto__.setItem = jest.fn();

let mockUseDispatch = jest.fn();

jest.mock('react-redux', () => ({
	useDispatch: () => mockUseDispatch,
	useSelector: jest.fn()
		.mockImplementation(selector => selector({
			pokemon_ghost: [
				{
					pokemon: {
						name: 'pokemock-1',
						url: 'www.test.com/123',
						value: '5.55'
					}
				},
				{
					pokemon: {
						name: 'pokemock-2',
						url: 'www.test.com/166',
						value: '3.33'
					}
				},
				{
					pokemon: {
						name: 'pokemock-3',
						url: 'www.test.com/133',
						value: '1.55'
					}
				}
			]
		}))
})
);

jest.mock('axios');

describe('<Market />', () => {
	it('should render component with request success', () => {
		const pokemon = [
			{
				pokemon: {
					name: 'pokemon-1',
					url: 'www.test.com'
				}
			}
		];
		axios.get.mockResolvedValueOnce({ 
			data: { 
				pokemon
			},
			error: false,
			loading: false
		});
		const { getByText } = render(
			<Market type="ghost" />
		);

        
		waitFor(() => {
			expect(getByText('pokemock-1')).toBeDefined();
			expect(getByText('US$ 1.55')).toBeDefined();
			expect(window.localStorage.__proto__.setItem).toHaveBeenCalledWith('pokemon-ghost', JSON.stringify(pokemon));

			expect(mockUseDispatch).toHaveBeenCalledWith({
				type: 'POKEMON_GHOST_RESULT',
				payload: pokemon
			});
		});
	});
});