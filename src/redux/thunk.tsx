import { createAsyncThunk } from "@reduxjs/toolkit";
import { Character, CharacterState, Episode } from "./slice";

/**
 * Acción asíncrona de Redux para obtener una lista de personajes desde la API externa de Rick y Morty.
 *
 * @function
 * @name getCharacters
 * @async
 * @param {undefined} _ - No se requieren argumentos para esta acción.
 * @param {Object} { getState } - El segundo argumento de la acción que proporciona acceso al estado actual.
 * @returns {Promise<Character[]>} Una promesa que se resuelve en un arreglo de personajes obtenidos de la API.
 * @throws {Error} Error si la solicitud a la API falla.
*/

export const getCharacters = createAsyncThunk(
	"characters/getCharacters",
	async (_, { getState }): Promise<Character[]> => {
		const state = getState() as { character: CharacterState };
		const totalPages = 42;
		let characters: Character[] = [];

		for (let page = 1; page <= totalPages; page++) {
			const resp = await fetch(
				`https://rickandmortyapi.com/api/character/?page=${page}`
			);
			const data = await resp.json();
			characters = characters.concat(data.results);
		}
		return characters;
	}
);

/**
 * Acción asíncrona de Redux para obtener una lista de episodios desde la API externa de Rick y Morty.
 *
 * @function
 * @name getEpisodes
 * @async
 * @param {undefined} _ - No se requieren argumentos para esta acción.
 * @param {Object} { getState } - El segundo argumento de la acción que proporciona acceso al estado actual.
 * @returns {Promise<Episode[]>} Una promesa que se resuelve en un arreglo de episodios obtenidos de la API.
 * @throws {Error} Error si la solicitud a la API falla.
*/

export const getEpisodes = createAsyncThunk(
	"characters/getEpisodes",
	async (_, { getState }): Promise<Episode[]> => {
		const state = getState() as { character: CharacterState };
		let episodes: Episode[] = [];
		const resp = await fetch(`https://rickandmortyapi.com/api/episode`);
		const data = await resp.json();
		episodes = episodes.concat(data.results);
		return episodes;
	}
);