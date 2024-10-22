import {
  useGetPokemonById,
  useGetPokemonByName,
  useGetPokemons,
} from "@/api/useQueryHooks";
import SearchInput from "@/app/components/SearchInput";
import { useDebounce } from "@uidotdev/usehooks";
import React from "react";
import { useFormContext } from "react-hook-form";

const ListOfPokemons = () => {
  const { watch } = useFormContext();
  const value = watch("search-input").toLowerCase();

  // Debouncing the input value
  const debouncedValue = useDebounce(value, 300); // Ajusta el tiempo de espera según sea necesario

  // Fetching Pokémon data by debounced name
  const { data } = useGetPokemonByName(debouncedValue);

  return <div>{/* Aquí puedes mostrar los datos de Pokémon obtenidos */}</div>;
};

export default ListOfPokemons;
