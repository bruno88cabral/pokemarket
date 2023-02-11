import React from 'react';
import PropTypes from 'proptypes';
import Search from './search';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';

import styles from './styles.scss';
import { isMobile } from '../../../utils';

const Header = ({ type }) => {
	const header = classNames(styles.container, styles[type]);
	const dispatch = useDispatch();

	const stateResult = state => state[`cart_${type}`];
	const cart = useSelector(stateResult);

	const counter = cart?.length;

	const onClickCart = () => {
		if (isMobile(window) ) {
			dispatch({
				type: 'TOGGLE_CART'
			});
		}
	};

	return (
		<header className={styles.header}>
			<div className={header}>
				<Link href="/">
					<img 
						className={styles.icon}
						src={`/${type}.svg`}
					/>
				</Link>

				<Search type={type} />
                
				<div 
					className={styles.cart}
					onClick={onClickCart}
				>
					<img
						className={styles['cart-icon']}
						src="/cart.png" 
					/>
					{counter > 0 && (
						<span className={styles.counter}>
							{ counter }
						</span>
					)}
				</div>
			</div>
		</header>
	);
};

Header.propTypes = {
	type: PropTypes.string
};


export default Header;
