import "./Detalle.css";
import { useEffect } from "react";
import BotonFavorito from "../componentes/botones/boton-favorito.componente";
import TarjetaEpisodio from "../componentes/episodios/tarjeta-episodio.componente";
import { RootState } from "../redux/store";
import { getEpisodes } from "../redux/thunk";
import { useDispatch, useSelector } from "react-redux";
import { setFavCharacter, loadFavoritesFromLocalStorage } from "../redux/slice";

const PaginaDetalle = () => {
	const dispatch = useDispatch();
	const selectedCharacter = useSelector(
		(state: RootState) => state.character.selectedCharacter
	);

	useEffect(() => {
		const favorites = loadFavoritesFromLocalStorage();
		dispatch(setFavCharacter(favorites));
		dispatch(getEpisodes() as any);
	}, [dispatch]);

	return (
		<div className="container">
			{selectedCharacter ? (
				<>
					<h3>{selectedCharacter.name}</h3>
					<div className="detalle">
						<div className="detalle-header">
							<img src={selectedCharacter.image} alt={selectedCharacter.name} />
							<div className="detalle-header-texto">
								<strong>{selectedCharacter.name}</strong>
								<p>Planeta: {selectedCharacter.origin.name}</p>
								<p>Genero: {selectedCharacter.gender}</p>
							</div>
							<BotonFavorito characterId={selectedCharacter.id} />
						</div>
					</div>
					<h4>Lista de episodios donde apareció el personaje</h4>
					<div className="episodios-grilla">
						{selectedCharacter.episode.map(
							(episodeUrl: string, index: number) => (
								<TarjetaEpisodio key={index} episodeUrl={episodeUrl} />
							)
						)}
					</div>
				</>
			) : (
				<p>Selecciona un personaje para ver los detalles.</p>
			)}
		</div>
	);
};

export default PaginaDetalle