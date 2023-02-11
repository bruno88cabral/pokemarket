import React, { useEffect, useState } from 'react';
import PropTypes from 'proptypes';
import Router from 'next/router';
import { Button, Modal } from '../../../components';
import classNames from 'classnames';
import { useLocalStorage } from '../../../hooks';
import { sumCartValue, groupBy, isMobile } from '../../../utils';
import { useSelector, useDispatch } from 'react-redux';

import styles from './styles.scss';


const CartSummary = ({ type, resume = false }) => {
	const storageKey = `cart-${type}`;
	const [ cartStorage, setCartStorage ] = useLocalStorage(storageKey, []);
	const [ showModal, setShowModal ] = useState(false);

	const dispatch = useDispatch();
    
	const stateResult = state => state[`cart_${type}`];
	const cart = useSelector(stateResult);

	const openCartResult = state => state.toggle_cart;
	const isOpenCart = useSelector(openCartResult);

	const cartGroupResult = state => state[`cart_group_${type}`];
	const cartGroup = useSelector(cartGroupResult);

	useEffect(() => {
		if (cart?.length !== 0) {
			setCartStorage(cart);
		} else {
			dispatch({
				type: `CART_${type?.toUpperCase()}_RESULT`,
				payload: cartStorage
			});
		}

	}, []);

	useEffect(() => {
		let groupCart = [];
		let group = groupBy(cart, 'name') || {};
		if (group) {
			Object.keys(group)
				.forEach(key => {
					groupCart.push({
						name: key,
						length: group[key].length,
						value: group[key][0].value
					});
				});

			dispatch({
				type: `CART_GROUP_${type?.toUpperCase()}_RESULT`,
				payload: groupCart
			});
		}
	}, [cart]);
    
	const onClean = () => {
		dispatch({
			type: `CART_${type?.toUpperCase()}_CLEAN`
		});
		dispatch({
			type: `CART_GROUP_${type?.toUpperCase()}_CLEAN`
		});
		setCartStorage([]);
	};

	const onClickBuy = () => {
		setShowModal(true);
	};

	const onClickModalBtn = () => {
		Router.router.push('/');
		onClean();
	};

	const onCheckout = () => {
		Router.router.push(`/cart/${type}`);
	};

	const onClickClose = () => {
		dispatch({
			type: 'TOGGLE_CART'
		});
	};

	const total = sumCartValue(cart);
    
	const cx = classNames(
		styles.cart,
		styles[type],
		{ 
			[styles.resume]: resume,
			[styles.openCart]: isOpenCart
		}
	);

	return (
		<section className={cx}>
			<div className={styles['cart-summary']}>
				<div>
					{isMobile(window) && !resume && (
						<img
							className={styles['close-icon']}
							src="/x.png"
							width={25}
							onClick={onClickClose}
						/>
					)}
					<h2>Cart</h2>
					{cartGroup?.map(({
						name,
						value,
						length
					}, key) => (
						<dl key={key}>
							<dt>{ `${length}x - ${name}` }</dt>
							<dd>US$ { value }</dd>
						</dl>
					))}
				</div>
			</div>
			{resume ? (
				<div className={styles.add}>
					<Button 
						onClick={onClickBuy}
						type="add"
						test-id="add"
					>
                        Buy!
					</Button>
				</div>
			) : (
				<div className={styles['cart-footer']}>
					<div className={styles.total}>
						<dl>
							<dt>
								<strong>
									Total
								</strong>
							</dt>
							<dd>
								<strong>
									{total
										? `US$ ${total}`
										: '-'}
								</strong>
							</dd>
						</dl>
					</div>
					<div className={styles.buttons}>
						<Button
							onClick={onClean}
							type="secundary"
						>
								Clean cart
						</Button>
						<Button
							disabled={cart?.length === 0}
							onClick={onCheckout}
							type="primary"
						>
								Checkout
						</Button>
					</div>
				</div>
			)}
			{showModal && ( 
				<Modal 
					title="Order successfully done"
					message="Thanks! You are always welcome"
					primaryBtnLabel="Finish"
					onClickPrimaryBtn={onClickModalBtn}
				/> 
			) }
		</section>
	);
};

CartSummary.propTypes = {
	type:  PropTypes.string,
	resume: PropTypes.bool
};

export default CartSummary;