import Filtros from "../componentes/personajes/filtros.componente"
import GrillaPersonajes from "../componentes/personajes/grilla-personajes.componente"
import Paginacion from "../componentes/paginacion/paginacion.componente";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFavCharacter, loadFavoritesFromLocalStorage} from "../redux/slice";

/**
 * Esta es la pagina principal. Aquí se debera ver el panel de filtros junto con la grilla de personajes.
 *
 * Uso:
 * ``` <PaginaInicio /> ```
 *
 * @returns la pagina de inicio
*/

const PaginaInicio = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const favorites = loadFavoritesFromLocalStorage();
		dispatch(setFavCharacter(favorites));
	}, [dispatch]);

	return (
		<div className="container">
			<div className="actions">
				<h3>Catálogo de Personajes</h3>
			</div>
			<Filtros />
			<Paginacion />
			<GrillaPersonajes />
			<Paginacion />
		</div>
	);
};

export default PaginaInicio