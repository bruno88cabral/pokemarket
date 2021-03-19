import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Search from './';

const mockUseDispatch = jest.fn();

jest.mock('react-redux', () => ({
	useDispatch: () => mockUseDispatch,
}));

describe('<Search />', () => {
	it('should render component', () => {
		const { container } = render(
			<Search type="ice" />
		);

		expect(container.querySelector('.search')).toBeDefined();
	});

	it('function -> handleChange', () => {
		const { container, getByDisplayValue } = render(
			<Search type="ice" />
		);

		fireEvent.change(container.querySelector('.input'), {
			target: {
				value: 'pokemon'
			}
		});

		expect(getByDisplayValue('pokemon')).toBeDefined();
	});

	it('function -> onCLickSearch', () => {
		const { container } = render(
			<Search type="ice" />
		);

		fireEvent.change(container.querySelector('.input'), {
			target: {
				value: 'pika'
			}
		});
        
		fireEvent.click(container.querySelector('button'));

		expect(mockUseDispatch).toHaveBeenCalledWith({
			type: 'POKEMON_ICE_RESULT',
			payload: []
		});
	});
});
