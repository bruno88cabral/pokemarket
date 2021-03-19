import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Router from 'next/router';
import BackPage from './';

Router.router = {
	back: jest.fn()
};

describe('<BackPage />', () => {
	it('should render component and click to back', () => {
		const { container } = render(
			<BackPage/>
		);
		const link = container.querySelector('.back');
		fireEvent.click(link);

		expect(Router.router.back).toHaveBeenCalled();
	});
});