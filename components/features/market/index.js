import React, {useEffect } from 'react';
import Head from 'next/head';
import PropTypes from 'proptypes';
import { useDispatch, useSelector } from 'react-redux';
import { useRequest, useLocalStorage } from '../../../hooks';
import { Header, Card, Alert, CartSummary } from '../../../components';
import { imageSrc, randomValue } from '../../../utils';
import { TYPES } from '../../../contants';

import styles from './styles.scss';

const Market = ({type}) => {
	const storageKey = `pokemon-${type}`;
	const [pokemonStorage, setPokemonStorage] = useLocalStorage(storageKey, []);
	const isStorageEmpty = pokemonStorage.length === 0;

	const pokemon = useSelector( state => state[`pokemon_${type}`]);
	const dispatch = useDispatch();
    
	const [{data, error, loading}, doRequest] = useRequest();
    
	useEffect(() => {
		if (isStorageEmpty) {
			doRequest('get', `type/${TYPES[type]}`);
		} 
	}, []);
    
	useEffect(() => {
		data?.pokemon?.map(({pokemon}) => pokemon.value = randomValue());
        
		if (isStorageEmpty) {
			setPokemonStorage(data?.pokemon || []);
		}
        
		const payload = !isStorageEmpty
			? pokemonStorage
			: data?.pokemon;
        
		dispatch({ 
			type: `POKEMON_${type?.toUpperCase()}_RESULT`, 
			payload: payload || []
		});
	}, [data]);

	return (
		<>
			<Head>
				<title>Pokemon Market</title>
				<link rel="icon" href={`/${type}.ico`} />
			</Head>

			<Header type={type} />

			<section className={styles.market}>

				<section className={styles.pokemon}>
					{!loading && !error && pokemon?.map(({pokemon}, i) => {
						const code = pokemon.url.replace(/[^0-9]/g, '').slice('1');
						const src = imageSrc(code);
						return (
							<Card
								key={i}
								src={src}
								name={pokemon.name}
								value={pokemon.value}
								type={type}
								code={code}
							/>
						);
					})}
					{loading && (
						<Alert 
							type="loading"
							title="Loading..."
							message="Wait" 
						/>
					)}
					{error && (
						<Alert 
							type="error"
							title={error.title}
							message={error.message}
						/>
					)}
				</section>

                
				{type && ( <CartSummary type={type} /> ) }
             

			</section>
		</>
	);
};

Market.propTypes = {
	type: PropTypes.string
};


export default Market;