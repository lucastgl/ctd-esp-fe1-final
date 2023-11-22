import BotonFavorito from '../botones/boton-favorito.componente';
import './tarjeta-personaje.css';
import { Character, selectCharacter } from '../../redux/slice';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

/**
 * Tarjeta para cada personaje dentro de la grilla de personajes.
 *
 * Deberás agregar las propiedades necesarias para mostrar los datos de los personajes
 *
 *
 * @returns un JSX element
 */

interface TarjetaPersonajeProps {
	character: Character;
	name: string;
	image: string;
}

const TarjetaPersonaje: React.FC<TarjetaPersonajeProps> = ({ character }) => {
	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(selectCharacter(character));
	};

	return (
		<Link to={`/detalle/${character.id}`}>
			<div className="tarjeta-personaje" onClick={handleClick}>
				<div className="tarjeta-personaje-body">
					<img src={character.image} alt={character.name} />
					<div className="tarjeta-personaje-body">
						<span>{character.name}</span>
					</div>
					<BotonFavorito characterId={character.id} />
				</div>
			</div>
		</Link>
	);
}

export default TarjetaPersonaje;