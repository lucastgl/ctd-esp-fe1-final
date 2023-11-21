import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit"
import characterReducer from "./slice";

const store = configureStore({
    reducer: {
        character: characterReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch =  typeof store.dispatch;

type DispatchFunc = () => AppDispatch;

export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Selector de Redux para obtener el número de página actual desde el estado.
 *
 * @function
 * @name selectCurrentPage
 * @param {RootState} state - El estado de la aplicación.
 * @returns {number} El número de página actual.
 */
export const selectCurrentPage = (state: RootState) =>	state.character.currentPage;

/**
 * Selector de Redux para obtener personajes filtrados por página actual desde el estado.
 *
 * @function
 * @name selectFilteredCharactersForCurrentPage
 * @param {RootState} state - El estado de la aplicación.
 * @returns {Character[]} Un arreglo de personajes filtrados por la página actual.
 */
export const selectFilteredCharactersForCurrentPage = createSelector(
	[selectCurrentPage, (state: RootState) => state.character.filteredCharacters],
	(currentPage, filteredCharacters) => {
		const startIndex = (currentPage - 1) * 9;
		const endIndex = startIndex + 9;
		return filteredCharacters.slice(startIndex, endIndex);
	}
);

/**
 * Selector de Redux para obtener personajes por página actual desde el estado.
 *
 * @function
 * @name selectCharactersForCurrentPage
 * @param {RootState} state - El estado de la aplicación.
 * @returns {Character[]} Un arreglo de personajes por la página actual.
 */
export const selectCharactersForCurrentPage = createSelector(
	[selectCurrentPage, (state: RootState) => state.character.characters],
	(currentPage, characters) => {
		const startIndex = (currentPage - 1) * 9;
		const endIndex = startIndex + 9;
		return characters.slice(startIndex, endIndex);
	}
);

export default store;