import React from 'react';
import { render } from '@testing-library/react';
import Welcome from './';

describe('<Welcome />', () => {
	it('should render the component', () => {
		const { getByText } = render(
			<Welcome />
		);

		expect(getByText('ghost market')).toBeDefined();
		expect(getByText('ice market')).toBeDefined();
		expect(getByText('rock market')).toBeDefined();
		expect(getByText('dark market')).toBeDefined();
	});
});