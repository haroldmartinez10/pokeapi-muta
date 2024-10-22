import axios from "axios";

export interface PokemonAbility {
  ability: {
    name: string;
  };
}

export interface PokemonType {
  type: {
    name: string;
  };
}

export interface PokemonSprite {
  front_default: string;
  back_default?: string;
}

export interface PokemonForm {
  name: string;
}

export interface PokemonApiResponse {
  name: string;
  sprites: PokemonSprite;
  abilities: PokemonAbility[];
  types: PokemonType[];
  forms: PokemonForm[];
}

export const fetchPokemons = async (
  currentPage: number,
  pokemonsPerPage: number
): Promise<PokemonApiResponse[]> => {
  const offset = (currentPage - 1) * pokemonsPerPage;
  const response = await axios.get<{
    results: { url: string; name: string }[];
  }>(
    `https://pokeapi.co/api/v2/pokemon?limit=${pokemonsPerPage}&offset=${offset}`
  );

  const pokemons = response.data.results;

  const pokemonData = await Promise.all(
    pokemons.map(async (pokemon) => {
      const detailsResponse = await axios.get<PokemonApiResponse>(pokemon.url);
      return {
        name: detailsResponse.data.name,
        sprites: detailsResponse.data.sprites,
        abilities: detailsResponse.data.abilities.map((ability) => ({
          ability: {
            name: ability.ability.name,
          },
        })),
        types: detailsResponse.data.types.map((type) => ({
          type: {
            name: type.type.name,
          },
        })),
        forms: detailsResponse.data.forms,
      };
    })
  );

  return pokemonData;
};

export const fetchPokemonById = async (
  id: number
): Promise<PokemonApiResponse> => {
  const response = await axios.get<PokemonApiResponse>(
    `https://pokeapi.co/api/v2/pokemon/${id}`
  );
  return response.data;
};
export const fetchPokemonByName = async (
  name: string
): Promise<PokemonApiResponse> => {
  try {
    const response = await axios.get<PokemonApiResponse>(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    return response.data;
  } catch (error) {
    // Manejo del error
    console.error(`Error fetching Pokémon: ${name}`, error);

    // Puedes lanzar el error o manejarlo de otra manera
    throw new Error(`No se pudo obtener el Pokémon: ${name}`);
  }
};
