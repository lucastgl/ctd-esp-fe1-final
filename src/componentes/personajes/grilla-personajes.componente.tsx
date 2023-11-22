import './grilla-personajes.css';
import TarjetaPersonaje from './tarjeta-personaje.componente';
import { useEffect } from 'react';
import { getCharacters } from '../../redux/thunk';
import { filterCharacter, loadFavoritesFromLocalStorage, setFavCharacter } from '../../redux/slice';
import { selectCharactersForCurrentPage, selectFilteredCharactersForCurrentPage, useAppDispatch, useAppSelector } from '../../redux/store';

/**
 * Grilla de personajes para la pagina de inicio
 *
 * Deberás agregar las funciones necesarias para mostrar y paginar los personajes
 *
 *
 * @returns un JSX element
 */
const GrillaPersonajes = () => {
	const { isLoading, isError } = useAppSelector((state) => state.character);
	const filteredCharacters = useAppSelector(
		selectFilteredCharactersForCurrentPage
	);
	const characters = useAppSelector(selectCharactersForCurrentPage);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const favorites = loadFavoritesFromLocalStorage();
		dispatch(setFavCharacter(favorites));
	}, [characters, dispatch]);

	useEffect(() => {
		dispatch(getCharacters());
	}, [dispatch]);

	useEffect(() => {
		dispatch(filterCharacter(""));
	}, [isLoading, dispatch]);

	return (
		<div className="grilla-personajes">
			{isLoading && <p>Loading...</p>}
			{isError && <p>{isError}</p>}
			{filteredCharacters.length === 0 && <p>No characters found.</p>}
			{filteredCharacters.length > 0 &&
				filteredCharacters.map((character) => (
					<TarjetaPersonaje
						character={character}
						name={character.name}
						image={character.image}
						key={character.id}
					/>
			    ))
            }
		</div>
	);
}
 
export default GrillaPersonajes;