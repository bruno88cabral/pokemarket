import React from 'react';
import PropTypes from 'proptypes';

import Image from 'next/image';
import classNames from 'classnames';

import styles from './styles.scss';

const Alert = ({type, title, message}) => {
	const img = classNames({
		[styles.img]: type === 'error',
	});

	return (
		<div className={styles.alert}>
			<div className={img}>
				<Image 
					src={`/${type}.svg`}
					width={100}
					height={100}
				/>
			</div>
			<div>
				<h3>{title}</h3>
				<p>{message}</p>
			</div>
		</div>
	);
};

Alert.propTypes = {
	type: PropTypes.string,
	title: PropTypes.string,
	message: PropTypes.string
};

export default Alert;