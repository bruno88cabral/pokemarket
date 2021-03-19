import React from 'react';
import PropTypes from 'proptypes';
import Link from 'next/link';
import { Button } from '../../../components';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useLocalStorage } from '../../../hooks';

import styles from './styles.scss';

const Card = ({
	src,
	name,
	value, 
	type, 
	code
}) => {
	const storageKey = `cart-${type}`;
	const [, setCartStorage] = useLocalStorage(storageKey, []);

	const dispatch = useDispatch();
	const cart = useSelector(state => state[`cart_${type}`]);

	const onClickAdd = () => {
		dispatch({
			type: `CART_${type.toUpperCase()}_RESULT`,
			payload: [{ name, value }] 
		});

		setCartStorage([ 
			...cart,
			...[{ name, value }] 
		]);
	};

	const card = classNames(styles.card, styles[type]);
	return (
		<div className={card}>
			<Link 
				href={`/pokemon/${type}/${code}`}
			>
				<a className={styles.link}>
					<div className={styles.img}>
						<img src={src} /> 
					</div>
					<h3 className={styles.name}>
						{name}
					</h3>
				</a>
			</Link>
            
			<h4> 
                US$ {value}
			</h4>
            
			<div className={styles.info}>
				<Button 
					type="add"
					onClick={onClickAdd}
				>
                    Add to Cart
				</Button>
			</div>
		</div>
	);
};

Card.propTypes = {
	src: PropTypes.string,
	name: PropTypes.string,
	value: PropTypes.string, 
	type: PropTypes.string, 
	code: PropTypes.string
};

export default Card;
