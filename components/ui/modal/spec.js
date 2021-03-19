import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Modal from './';

describe('<Modal />', () => {
	it('should render component', () => {
		const { getByText } = render(
			<Modal
				title="Thank you"
				message="You are welcome"
				primaryBtnLabel="Finish" 
				secundaryBtnLabel="Cancel"
				onClickPrimaryBtn={() => {}}
				onClickSecundaryBtn={() => {}}
			/>

		);
		expect(getByText('Thank you')).toBeDefined();
		expect(getByText('You are welcome')).toBeDefined();
		expect(getByText('Finish')).toBeDefined();
		expect(getByText('Cancel')).toBeDefined();
	});

	it('should click primary btn', () => {
		const onClickPrimaryBtn = jest.fn();
		const { getByText } = render(
			<Modal
				title="Thank you"
				message="You are welcome"
				primaryBtnLabel="Finish" 
				secundaryBtnLabel="Cancel"
				onClickPrimaryBtn={onClickPrimaryBtn}
				onClickSecundaryBtn={() => {}}
			/>

		);

		const primaryBtn = getByText('Finish');
		fireEvent.click(primaryBtn);

		expect(onClickPrimaryBtn).toHaveBeenCalled();
	});

	it('should click secundary btn', () => {
		const onClickSecundaryBtn = jest.fn();
		const { getByText } = render(
			<Modal
				title="Thank you"
				message="You are welcome"
				primaryBtnLabel="Finish" 
				secundaryBtnLabel="Cancel"
				onClickPrimaryBtn={() => {}}
				onClickSecundaryBtn={onClickSecundaryBtn}
			/>

		);

		const secundaryBtn = getByText('Cancel');
		fireEvent.click(secundaryBtn);

		expect(onClickSecundaryBtn).toHaveBeenCalled();
	});
});