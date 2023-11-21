import { PayloadAction, createSlice, createAction } from "@reduxjs/toolkit";
import { getCharacters, getEpisodes } from "./thunk";

export type Character = {
	id: number;
	name: string;
	status: string;
	image: string;
	isFavorite: boolean;
	origin: {
		name: string;
	};
	gender: string;
	episode: string[];
};

export type Episode = {
	id: number;
	name: string;
	air_date: string;
	episode: string;
};

export type CharacterState = {
	characters: Character[];
	favoriteCharacters: Character[];
	isLoading: boolean;
	isError: string | boolean | null;
	filteredCharacters: Character[];
	isFavorite: boolean;
	currentPage: number;
	selectedCharacter: Character | null;
	episodes: Episode[];
	isEpisodeLoading: boolean;
};

const initialState: CharacterState  = {
    characters: [],
	favoriteCharacters: [],
	isLoading: false,
	isError: null,
	filteredCharacters: [],
	isFavorite: false,
	currentPage: 1,
	selectedCharacter: null,
	episodes: [],
	isEpisodeLoading: false,
}

/**
 * Carga los personajes favoritos almacenados en el storage local.
 *
 * @function
 * @name loadFavoritesFromLocalStorage
 * @returns {Character[]} Un arreglo de personajes favoritos.
*/
export const loadFavoritesFromLocalStorage = () => {
	const storedFavorites = localStorage.getItem("favorites");
	if (storedFavorites) {
		return JSON.parse(storedFavorites);
	}
	return [];
};

/**
 * Crea una acción para avanzar a la siguiente página de personajes.
 *
 * @function
 * @name nextPage
 * @returns {PayloadAction} Una acción de Redux para avanzar a la siguiente página.
*/
export const nextPage = createAction("character/nextPage");

/**
 * Crea una acción para retroceder a la anterior página de personajes.
 *
 * @function
 * @name previousPage
 * @returns {PayloadAction} Una acción de Redux para retroceder a la anterior página.
*/
export const previousPage = createAction("character/previousPage");

/**
 * Redux slice para gestionar el estado de los personajes.
 *
 * @constant {Slice} characterSlice
*/

/**
 * Alternar el estado de favorito de un personaje.
 *
 * @function
 * @name toggleFav
 * @param {number} characterId - ID del personaje para alternar su estado de favorito.
 * @returns {PayloadAction} Una acción de Redux para alternar el estado de favorito de un personaje.
*/

/**
 * Establecer los personajes favoritos en el estado.
 *
 * @function
 * @name setFavCharacter
 * @param {Character[]} characters - Un arreglo de personajes favoritos para establecer en el estado.
 * @returns {PayloadAction} Una acción de Redux para establecer los personajes favoritos en el estado.
*/

/**
 * Filtrar personajes por un término de búsqueda.
 *
 * @function
 * @name filterCharacter
 * @param {string} searchTerm - Término de búsqueda para filtrar personajes.
 * @returns {PayloadAction} Una acción de Redux para filtrar personajes por un término de búsqueda.
*/

/**
 * Ir a la siguiente página de personajes o episodios.
 *
 * @function
 * @name nextPageCharacters
 * @returns {PayloadAction} Una acción de Redux para avanzar a la siguiente página.
*/

/**
 * Ir a la página anterior de personajes o episodios.
 *
 * @function
 * @name prevPageCharacters
 * @returns {PayloadAction} Una acción de Redux para retroceder a la página anterior.
*/

/**
 * Borrar todos los personajes favoritos del estado y el almacenamiento local.
 *
 * @function
 * @name clearFav
 * @returns {PayloadAction} Una acción de Redux para borrar todos los personajes favoritos.
*/

/**
 * Seleccionar un personaje.
 *
 * @function
 * @name selectCharacter
 * @param {Character | null} character - El personaje seleccionado o nulo si ninguno está seleccionado.
 * @returns {PayloadAction} Una acción de Redux para seleccionar un personaje.
*/

export const characterSlice = createSlice({
    name: "character",
    initialState: initialState,
    reducers: {
        toggleFav: (state, action: PayloadAction<number>) =>{
            const characterId = action.payload;
            const character = state.characters.find(
                (char) => char.id === characterId
            );
            
            if (character) {
                const updatedCharacters = state.characters.map((char) => {
					if (char.id === characterId) {
						return {
							...char,
							isFavorite: !char.isFavorite,
						};
					}
					return char;
				});

				const isCharacterFavorite = state.favoriteCharacters.some(
					(char) => char.id === characterId
				);

				if (isCharacterFavorite) {
					state.favoriteCharacters = state.favoriteCharacters.filter(
						(char) => char.id !== characterId
					);
				} else {
					state.favoriteCharacters.push(character);
				}

				state.characters = updatedCharacters;
				localStorage.setItem(
					"favorites",
					JSON.stringify(state.favoriteCharacters)
				);
            }
        },

        setFavCharacter: (state, action: PayloadAction<Character[]>) => {
			const newFavorites = action.payload;
			const existingFavoriteIds = new Set(
				state.favoriteCharacters.map((char) => char.id)
			);

			const updatedFavorites = [
				...state.favoriteCharacters,
				...newFavorites.filter((char) => !existingFavoriteIds.has(char.id)),
			];

			state.favoriteCharacters = updatedFavorites;
			localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
		},

		filterCharacter: (state, action: PayloadAction<string>) => {
			const searchTerm = action?.payload?.toLowerCase();
			if (searchTerm?.length >= 0) {
				const filteredCharacters = state?.characters?.filter((character) =>
					character?.name?.toLowerCase().includes(searchTerm)
				);
				if (filteredCharacters.length > 0) {
					state.filteredCharacters = filteredCharacters;
				} else {
					state.filteredCharacters = [];
				}
			} else {
				state.filteredCharacters = state.characters;
			}
		},

		nextPageCharacters: (state) => {
			state.currentPage++;
		},

		prevPageCharacters: (state) => {
			state.currentPage--;
		},

		clearFav: (state) => {
			state.favoriteCharacters = [];
			localStorage.removeItem("favorites");
		},
		selectCharacter: (state, action: PayloadAction<Character | null>) => {
			state.selectedCharacter = action.payload;
		},

    },
    extraReducers: (builder) => {
		builder.addCase(getCharacters.pending, (state) => {
			state.isLoading = true;
		})

		builder.addCase(getCharacters.fulfilled, (state, action: PayloadAction<Character[]>) => {
			state.characters = action.payload;
			state.isLoading = false;
		})

		builder.addCase(getEpisodes.pending, (state) => {
			state.isEpisodeLoading = true;
		});

		builder.addCase(getEpisodes.fulfilled, (state, action: PayloadAction<Episode[]>) => {
				state.episodes = action.payload;
				state.isEpisodeLoading = false;
			}
		);

		builder.addCase(getEpisodes.rejected, (state, action) => {
			state.isEpisodeLoading = false;
		});
    }
});

export const {
    toggleFav,
    setFavCharacter,
    filterCharacter,
    nextPageCharacters,
    prevPageCharacters,
    clearFav,
    selectCharacter
} = characterSlice.actions;

const characterReducer = characterSlice.reducer

export default characterReducer;