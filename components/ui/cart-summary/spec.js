import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Router from 'next/router';
import CartSummary from './';

Router.router = {
	push: jest.fn()
};

jest.spyOn(window.localStorage.__proto__, 'setItem');
window.localStorage.__proto__.setItem = jest.fn();

let mockUseDispatch = jest.fn();

jest.mock('react-redux', () => ({
	useDispatch: () => mockUseDispatch,
	useSelector: jest.fn()
		.mockImplementation(selector => selector({
			cart_dark: [
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

describe('<CartSummary />', () => {

	describe('in market', () => {
		it('should render component and send data to local storage', () => {
			const { getByText } = render(
				<CartSummary 
					type="dark"
				/>
			);
    
			waitFor(() => {
				expect(getByText('pokemock-1')).toBeDefined();
				expect(getByText('US$ 5.55')).toBeDefined();
        
				expect(window.localStorage.__proto__.setItem).toHaveBeenCalledWith('cart-dark', JSON.stringify([
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
				]));
			});
		});
    
		it('function -> onClean()', () => {
			const { container } = render(
				<CartSummary 
					type="dark"
				/>
			);
            
			const cleanBtn = container.querySelector('.secundary');
    
			fireEvent.click(cleanBtn);
			expect(mockUseDispatch).toHaveBeenCalledWith({
				type: 'CART_DARK_CLEAN'
			});
    
			expect(window.localStorage.__proto__.setItem).toHaveBeenCalledWith('cart-dark', JSON.stringify([]));
		});
    
		it('function -> onCheckout', () => {
			const { container } = render(
				<CartSummary 
					type="dark"
				/>
			);
            
			const cleanBtn = container.querySelector('.primary');
    
			fireEvent.click(cleanBtn);
    
			expect(Router.router.push).toHaveBeenCalledWith('/cart/dark');
		});
	});

	describe('in resume', () => {
		it('function -> onClickBuy()', () => {
			const { getByText } = render(
				<CartSummary 
					type="dark"
					resume
				/>
			);
    
			const buyBtn = getByText('Buy!');
			fireEvent.click(buyBtn);

			expect(getByText('Order successfully done')).toBeDefined();
			expect(getByText('Thanks! You are always welcome')).toBeDefined();
		});

		it('function -> onClickModalBtn', () => {
			const { getByText } = render(
				<CartSummary 
					type="dark"
					resume
				/>
			);

			const buyBtn = getByText('Buy!');
			fireEvent.click(buyBtn);

			const modalBtn = getByText('Finish');
			fireEvent.click(modalBtn);

			expect(Router.router.push).toHaveBeenCalledWith('/');
			expect(window.localStorage.__proto__.setItem).toHaveBeenCalledWith('cart-dark', JSON.stringify([]));
		});
	});
});