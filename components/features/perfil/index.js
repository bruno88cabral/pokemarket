import React, { useEffect, useState } from 'react';
import PropTypes from 'proptypes';
import { useDispatch  } from 'react-redux';
import Router from 'next/router';
import { useRequest, useLocalStorage } from '../../../hooks';
import { imageSrc } from '../../../utils';
import { 
	Alert,
	BackPage,
	Button,
	Modal
} from '../..';
import classNames from 'classnames';

import styles from './styles.scss';

const Perfil = ({ code, type }) => {
	const { router } = Router;
	const dispatch = useDispatch();
	const [ cartStorage, setCartStorage ] = useLocalStorage(`cart-${type}`, []);
	const [ pokemonStorage ] = useLocalStorage(`pokemon-${type}`, []);
	const [ {data, loading, error}, doRequest ] = useRequest();
	const [ showModal, setShowModal ] = useState(false);
	const [ pokemon, setPokemon ] = useState({}); 

	useEffect(() => {
		code &&
            doRequest('get', `pokemon/${code}`);
	}, [code]);

	useEffect(() => {
		const item =  pokemonStorage
			.filter(({ pokemon }) => 
				data?.name === pokemon.name )[0];
		setPokemon(item?.pokemon);
	}, [data]);

	const handleData = data => (data / 10).toFixed(1);

	const onClickAdd = () => {
		setShowModal(true);

		dispatch({
			type: `CART_${type.toUpperCase()}_RESULT`,
			payload: [{ 
				name: data?.name, 
				value: pokemon?.value 
			}] 
		});

		setCartStorage([ ...cartStorage, ...[{ 
			name: data?.name, 
			value: pokemon?.value 
		}]]);
	};
    
	const typeClass = type => classNames(styles.type, styles[type]);
	return (
		<section  className={styles.perfil}>
			<BackPage />
			{!loading && !error && data && (
				<div>
					<div className={styles.card}>
						{type && (
							<Button 
								type="add"
								className={styles.add}
								onClick={onClickAdd}
							>
                                Add to Cart
							</Button>
						)}
						<h3 className={styles.name}>
							{data?.name} Nº {data?.id}
						</h3>
                        
						<div className={styles.img}>
							<img src={imageSrc(code)} width={200} height={200} />
						</div>
						<div className={styles.info}>
							<div className={styles.height}>
								<dl>
									<dt><strong> Heigth </strong></dt>
									<dd>{handleData(data?.height)} m</dd>
								</dl>
								<dl>
									<dt><strong> Weigh </strong> </dt>
									<dd>{handleData(data?.weight)} kg</dd>
								</dl>
								<dl>
									<dt><strong> Abilities </strong> </dt>
									{data?.abilities?.map(({ ability }, key) => (
										<dd key={key}>{ability?.name}</dd>
									))}
								</dl>
							</div>

							<dl>
								<dt><strong> Type </strong> </dt>
								<div className={styles.types}>
									{data?.types?.map(({type}, key) => 
										(
											<dd 
												key={key} 
												className={typeClass(type.name)}>
												{type.name}
											</dd>
										)
									)}
								</div>
							</dl>
							<dl>
								<dt><strong> Stats </strong></dt>
								<dd>
									<div className={styles.stats}>
										{data?.stats.map(({base_stat, stat}, key) => {
											const percent = `${(4 * base_stat / 9).toFixed(0)}%`;
											return (
												<dl key={key}>
													<dd className={styles.stat}>
														<div 
															className={styles.percent}
															style={{height: percent}}
														/>
													</dd>
													<dt>{stat.name}</dt>
												</dl>
											);
										})}
									</div>
								</dd>
							</dl>
						</div>
					</div>
					{showModal && ( 
						<Modal 
							title="The product was successfully added to the cart"
							message="What do you want to do?"
							primaryBtnLabel="Keep buying"
							secundaryBtnLabel="Checkout" 
							onClickPrimaryBtn={() => router.push(`/marketplace/${type}`)}
							onClickSecundaryBtn={() => router.push(`/cart/${type}`)}
						/> 
					) } 
				</div>
			)}
			{error && (
				<Alert 
					type="error"
					title={error.title}
					message={error.message} 
				/>
			)}
			{loading && (
				<div className={styles.alert}>
					<Alert 
						type="loading"
						title="Carregando..."
						message="Aguarde" 
					/>
				</div>
			)}
		</section>
	);
};

Perfil.propTypes = {
	type: PropTypes.string,
	code: PropTypes.string
};

export default Perfil;