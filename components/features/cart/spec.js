import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Cart from './';

jest.mock('react-redux', () => ({
	useDispatch: () => jest.fn(),
	useSelector: jest.fn()
		.mockImplementation(selector => selector({
			cart_dark: [
				{
					name: 'pokemock-1',
					value: '5.55'
				}
			]
		}))
}));

describe('<Cart />', () => {
	it('should render component', () => {
		const { container, getByText } = render(
			<Cart type="dark" />
		);

		waitFor(() => {
			expect(container.querySelector('.ice')).toBeDefined();
			expect(getByText('pokemock-1')).toBeDefined();
		});

	});
});