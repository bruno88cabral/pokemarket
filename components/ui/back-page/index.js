import React from 'react';
import Image from 'next/image';
import Router from 'next/router';

import styles from './styles.scss';

const BackPage = () => {
	const { router } = Router;
	const onClick = () => router.back();
	return (
		<div
			onClick={onClick} 
			className={styles.back}
		>
			<Image 
				src="/back.svg"
				width="50"
				height="50"
			/>
		</div>
	);
};

export default BackPage;