import React from 'react';
import PropTypes from 'proptypes';
import classNames from 'classnames';
import { Button } from '../../../components';

import styles from './styles.scss';

const Modal = ({
	title, 
	message, 
	primaryBtnLabel, 
	secundaryBtnLabel,
	onClickPrimaryBtn,
	onClickSecundaryBtn
}) => {
	const buttons = classNames(styles.buttons, {[styles.oneBtn]: !secundaryBtnLabel});
	return (
		<div className={styles.modal}>
			<div className={styles.content}>
				<h2>
					{ title }
				</h2>
				<p>
					{ message }
				</p>

				<div className={buttons}>
					{secundaryBtnLabel && (
						<Button 
							type="secundary"
							onClick={onClickSecundaryBtn}
						>
							{ secundaryBtnLabel }
						</Button>
					)}

					<Button 
						type="primary" 
						onClick={onClickPrimaryBtn}
					>
						{ primaryBtnLabel }
					</Button>
				</div>
			</div>

		</div>
	);
};

Modal.propTypes = {
	title: PropTypes.string, 
	message: PropTypes.string, 
	primaryBtnLabel: PropTypes.string, 
	secundaryBtnLabel: PropTypes.string,
	onClickPrimaryBtn: PropTypes.func,
	onClickSecundaryBtn: PropTypes.func
};

export default Modal;