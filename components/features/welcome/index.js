import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TYPES_NAME } from '../../../contants';

import styles from './styles.scss';

const Welcome = () => (
	<section className={styles.welcome}>
		{TYPES_NAME.map((market, key) => (
			<Link key={key} href={`/marketplace/${market}`} >
				<div className={styles[market]}>
					<Image 
						src={`/${market}.svg`}
						width={100}
						height={100} 
					/>
					<h2>{market} market</h2>
				</div>
			</Link>
		))}
	</section>
);

export default Welcome;