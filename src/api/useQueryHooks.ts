import { useQuery } from "@tanstack/react-query";
import {
  fetchPokemonById,
  fetchPokemonByName,
  fetchPokemons,
} from "./pokemonApi";
import { PokemonApiResponse } from "./types/PokemonApiResponse";

type UseGetPokemonsParams = {
  currentPage: number;
  pokemonsPerPage: number;
};

export const useGetPokemons = ({
  currentPage,
  pokemonsPerPage,
}: UseGetPokemonsParams) => {
  return useQuery<PokemonApiResponse[], Error>(
    ["pokemons", currentPage],
    () => fetchPokemons(currentPage, pokemonsPerPage),
    {}
  );
};

export const useGetPokemonById = (id: number) => {
  return useQuery<PokemonApiResponse, Error>(["pokemon", id], () =>
    fetchPokemonById(id)
  );
};

export const useGetPokemonByName = (name: string) => {
  return useQuery<PokemonApiResponse, Error>(
    ["pokemon", name],
    () => fetchPokemonByName(name),
    {
      enabled: !!name,
    }
  );
};
