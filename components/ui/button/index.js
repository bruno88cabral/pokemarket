import React from 'react';
import PropTypes from 'proptypes';
import classNames from 'classnames';

import styles from './styles.scss';

const Button = ({
	children,
	type,
	onClick,
	className,
	disabled = false
}) => {

	const cx = classNames(
		styles.button,
		styles[type],
		{ [styles.disabled]: disabled }
	);

	return (
		<div className={className}>
			<button
				disabled={disabled}
				className={cx}
				onClick={onClick}>
				{children}
			</button>
		</div>
	);
};

Button.propTypes = {
	type: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]).isRequired,
	onClick: PropTypes.func,
	className: PropTypes.string,
	disabled: PropTypes.bool

};

export default Button;