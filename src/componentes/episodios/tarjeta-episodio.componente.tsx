import React from "react";
import "./tarjeta-episodio.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

/**
 * Tarjeta para cada episodio dentro de la vista de personaje.
 * 
 * Deberás agregar las propiedades necesarias para mostrar los datos de los episodios
 * 
 * 
 * @returns un JSX element 
*/

interface episodioProps {
	episodeUrl: string;
}

const TarjetaEpisodio: React.FC<episodioProps> = ({ episodeUrl }) => {

    const episodes = useSelector((state: RootState) => state.character.episodes);

	const matchedEpisode = episodes.find((episode) =>
		episodeUrl.includes(`/episode/${episode.id}`)
	);

	if (!matchedEpisode) {
		return (
			<div className="tarjeta-episodio">
				<h4>No Episodes Found</h4>
			</div>
		);
	}

    return (
        <div className="tarjeta-episodio">
            <h4>Close Rick-counters of the Rick Kind</h4>
            <div>
                <span>S01E01</span>
                <span>Lanzado el: April 7, 2014</span>
            </div>
        </div>
    )
}

export default TarjetaEpisodio;
