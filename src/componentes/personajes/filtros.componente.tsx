import { useEffect, useState } from 'react';
import './filtros.css';
import { useAppDispatch } from '../../redux/store';
import { getCharacters } from '../../redux/thunk';
import { filterCharacter } from '../../redux/slice';

const Filtros = () => {

	const dispatch = useAppDispatch();
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		dispatch(getCharacters());
	}, [dispatch]);

	useEffect(() => {
		dispatch(filterCharacter(searchTerm));
	}, [dispatch, searchTerm]);

	/**
	 * Maneja el evento de limpiar los filtros.
	 * Esta función se encarga de restablecer el término de búsqueda y eliminar el filtro actual,
	 * lo que resulta en la visualización de todos los personajes nuevamente.
	 *
	 * @function
	 * @name handleClearFilter
	 * @memberof Filtros
	 * @returns {void}
	*/

	const handleClearFilter = () => {
		setSearchTerm("");
		dispatch(filterCharacter(""));
	};

	return (
		<div className="filtros">
			<label htmlFor="nombre">Filtrar por nombre:</label>
			<input
				type="text"
				placeholder="Rick, Morty, Beth, Alien, ...etc"
				name="nombre"
				value={searchTerm}
				onChange={(event) => setSearchTerm(event.target.value)}
			/>
			<button
				className="danger limpiar-filtros-btn"
				onClick={handleClearFilter}
			>
				Limpiar filtros
			</button>
		</div>
    )
}

export default Filtros;