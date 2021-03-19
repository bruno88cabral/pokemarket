import React from 'react';
import PropTypes from 'proptypes';
import { CartSummary, BackPage } from '../../../components';
import styles from './styles.scss';

const Cart = ({ type }) => {
	return (
		<div className={styles.cart}>
			<BackPage />

			<CartSummary 
				type={type}
				resume={true}
			/>
		</div>
	);
};

Cart.propTypes = {
	type: PropTypes.string
};

export default Cart;