import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../redux/store";
import TarjetaPersonaje from "../componentes/personajes/tarjeta-personaje.componente";
import { clearFav, setFavCharacter, loadFavoritesFromLocalStorage } from "../redux/slice";

/**
 * Esta es la pagina de favoritos. Aquí se deberan ver todos los personajes marcados como favoritos
 *
 * Uso:
 * ``` <PaginaFavoritos /> ```
 *
 * @returns la pagina de favoritos
 */
const PaginaFavoritos = () => {
	const favoriteCharacters = useAppSelector(
		(state) => state.character.favoriteCharacters
	);

	const dispatch = useDispatch();

	useEffect(() => {
		const favorites = loadFavoritesFromLocalStorage();
		dispatch(setFavCharacter(favorites));
	}, [dispatch]);


	/**
	 * Maneja el evento de limpiar todos los personajes favoritos.
	 * Esta función se encarga de eliminar todos los personajes marcados como favoritos, tanto del estado de Redux como del almacenamiento local.
	 *
	 * @function
	 * @name handleClearFavorites
	 * @memberof PaginaFavoritos
	 * @returns {void}
	 */
	const handleClearFavorites = () => {
		dispatch(clearFav());
	};

	return (
		<div className="container">
			<div
				className="actions"
				style={{ display: "flex", flexDirection: "column" }}
			>
				<h3>Personajes Favoritos</h3>
				{favoriteCharacters.length > 0 ? (
					<button
						className="danger limpiar-filtros-btn"
						onClick={handleClearFavorites}
					>
						Remover todos
					</button>
				) : (
					<h4>Aún no se han agregado favoritos</h4>
				)}
				{favoriteCharacters.map((character) => (
					<TarjetaPersonaje
						key={character.id}
						name={character.name}
						image={character.image}
						character={character}
					/>
				))}
			</div>
		</div>
	);
};
export default PaginaFavoritos