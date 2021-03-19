import React, { useState } from 'react';
import PropTypes from 'proptypes';
import { useDispatch } from 'react-redux';
import { useLocalStorage } from '../../../../hooks';
import styles from './styles.scss';

const Search = ({ type }) => {
	const [value = '', setValue] = useState('');
	const storageKey = `pokemon-${type}`;
	const [pokemonStorage] =  useLocalStorage(storageKey, []);
    
	const dispatch = useDispatch();

	const handleChange = ({ target }) => {
		setValue(target.value);
	};

	const onCLickSearch = e => {
		e.preventDefault();

		const filtered = pokemonStorage.filter(({pokemon}) => {
			return pokemon.name.includes(value.trim());
		});
        
		dispatch({
			type: `POKEMON_${type.toUpperCase()}_RESULT`,
			payload: filtered
		});
	};

	return (
		<div className={styles.search}>
			<form noValidate id="search">
				<input 
					className={styles.input}
					value={value}
					onChange={handleChange} 
				/>
			</form>
			<button 
				type="submit"
				onClick={onCLickSearch}
				form="search">
				<img src="/search.png" />
			</button>
		</div>
	);
};

Search.propTypes = {
	type: PropTypes.string
};

export default Search;