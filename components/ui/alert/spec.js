import React from 'react';
import { render } from '@testing-library/react';
import Alert from './';


describe('<Alert />', () => {
	it('should render component with loading status', () => {
		const { getByText } = render(
			<Alert 
				type="loading"
				title="Loading..."
				message="Wait" 
			/>
		);

		expect(getByText('Loading...')).toBeDefined();
		expect(getByText('Wait')).toBeDefined();
	});
});