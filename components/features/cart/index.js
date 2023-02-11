import React from 'react';
import PropTypes from 'proptypes';
import { CartSummary, BackPage } from '../../../components';
import styles from './styles.scss';

const Cart = ({ type }) => {
	return (
		<section className={styles.cart}>
			<BackPage />

			<CartSummary 
				type={type}
				resume={true}
			/>
		</section>
	);
};

Cart.propTypes = {
	type: PropTypes.string
};

export default Cart;