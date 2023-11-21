import './boton-favorito.css';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFav } from '../../redux/slice';
import { Character } from '../../redux/slice';
import { RootState } from '../../redux/store';

/**
 * Boton que indica si un elemento es favorito o no, y da la posibilidad de marcarlo/desmarcarlo
 * 
 * Deberás tipar las propiedades si usas este componente
 * 
 * 
 * @returns un JSX element 
*/

interface botonFavProp {
    characterId: number;
}



const BotonFavorito: React.FC<botonFavProp> = ({characterId}) => {

    const dispatch = useDispatch();

    const isFavorite = useSelector((state: RootState) => state.character.favoriteCharacters.some(
        (char: Character) => char.id === characterId
    ));

    	/**
	 * Maneja el evento de hacer clic en el botón de favorito.
	 *
	 * Este manejador de eventos se ejecuta cuando el usuario hace clic en el botón de favorito. Envía una acción Redux para cambiar el estado de favorito del personaje asociado (lo agrega a favoritos si no está favoriteado y lo remueve en caso de ser favorito).
	 *
	 * @function
	 * @name handleClick
	 * @memberof BotonFavorito
	 * @returns {void}
	 */

	const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		e.stopPropagation();
		dispatch(toggleFav(characterId));
	};

    const src = isFavorite === true ? "/imagenes/star-filled.png" : "/imagenes/star.png";


    return(
        <div className="boton-favorito" onClick={handleClick}>
            <img src={src} alt={"favorito"} />
        </div>
    ) 
}

export default BotonFavorito;