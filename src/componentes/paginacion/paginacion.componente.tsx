import './paginacion.css';
import { useDispatch } from 'react-redux';
import { nextPageCharacters, prevPageCharacters } from '../../redux/slice';
import { useAppSelector, selectCurrentPage } from '../../redux/store';

/**
 * Componente que contiene los botones para paginar
 * 
 * Deberás agregar las propiedades necesarias para que funcione correctamente
 * 
 * 
 * @returns un JSX element 
*/

const Paginacion = () => {

    const dispatch = useDispatch();
    const currentPage = useAppSelector(selectCurrentPage);

    	/**
	 * Maneja el evento de hacer clic en el botón "Siguiente".
	 *
	 * Este manejador de eventos se ejecuta cuando el usuario hace clic en el botón "Siguiente". Envía una acción Redux para cambiar a la página siguiente, si está disponible.
	 *
	 * @function
	 * @name handleNextPage
	 * @memberof Paginacion
	 * @returns {void}
	 */

	const handleNextPage = () => {
		dispatch(nextPageCharacters());
	};

	/**
	 * Maneja el evento de hacer clic en el botón "Anterior".
	 *
	 * Este manejador de eventos se ejecuta cuando el usuario hace clic en el botón "Anterior". Envía una acción Redux para cambiar a la página anterior, si está disponible.
	 *
	 * @function
	 * @name handlePreviousPage
	 * @memberof Paginacion
	 * @returns {void}
	 */

	const handlePreviousPage = () => {
		dispatch(prevPageCharacters());
	};

    return(
        <div className="paginacion">
            <button
                disabled={currentPage === 1}
                className="primary"
                onClick={handlePreviousPage}
            >
                Anterior
            </button>
            <button
                disabled={currentPage === 92}
                className="primary"
                onClick={handleNextPage}
            >
                Siguiente
            </button>
        </div>
    )
}

export default Paginacion;