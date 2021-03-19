import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from './';

const onClickBtn = jest.fn(); 

describe('<Button />', () => {
	it('should render component and click', () => {
		const { container } = render(
			<Button
				type="add"
				onClick={onClickBtn}                
			>
                Buy!
			</Button>
		);

		const link = container.querySelector('.button');
		fireEvent.click(link);

		expect(onClickBtn).toHaveBeenCalled();
		expect(container.classList.contains('add')).toBeDefined();
	});
	it('should render component with disabled state', () => {
		const { container } = render(
			<Button
				type="add"
				onClick={onClickBtn}
				disabled
			>
                Buy!
			</Button>
		);

		expect(container.classList.contains('disabled')).toBeDefined();
	});

});