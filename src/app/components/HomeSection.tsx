import { useTranslations } from "next-intl";
import { useState } from "react";
import SearchInput from "./SearchInput";
import LanguageSwitcher from "@/shared/components/LanguageSwitcher";
import PokemonCard from "./PokemonCard";
import { useGetPokemonByName, useGetPokemons } from "@/api/useQueryHooks";
import { useFormContext } from "react-hook-form";
import { useDebounce } from "@uidotdev/usehooks";

const HomeSection = () => {
  const t = useTranslations("HomePage");

  const { watch } = useFormContext();
  const currentSearch = watch("search-input");
  const debounceSearch = useDebounce(currentSearch?.toLowerCase(), 500);

  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 20;
  const {
    data: allPokemons = [],
    isLoading,
    isError,
  } = useGetPokemons({
    currentPage,
    pokemonsPerPage,
  });

  const { data } = useGetPokemonByName(debounceSearch || "");
  const isSearching = debounceSearch?.length > 0;

  const pokemonName = data?.forms[0]?.name || "";
  const pokemonImageSrc = data?.sprites?.front_default || "";
  const pokemonTypes = data?.types?.map((type) => type.type.name) || [];
  const pokemonAbilities =
    data?.abilities?.map((ability) => ability.ability.name) || [];

  const totalPages = Math.ceil(1118 / pokemonsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="flex items-center justify-center">
      {isSearching ? (
        <div className="flex flex-col items-center w-full">
          <div className="mt-6 w-full">
            <SearchInput name="search-input" placeholder={t("placeholder")} />
          </div>
          <div className="w-full xl:w-4/12 mt-4 px-4">
            <PokemonCard
              name={pokemonName}
              imageSrc={pokemonImageSrc}
              types={pokemonTypes}
              abilities={pokemonAbilities}
            />
          </div>
        </div>
      ) : (
        <div className="flex-col justify-center items-center w-full">
          <div className="w-full flex flex-col items-center">
            <p className="text-6xl text-[#75747E] font-bold text-center mt-9">
              {t("title")}
            </p>
            <p className="text-4xl flex mt-4 text-center ">
              {t("description")}
            </p>
          </div>

          <div className="w-full flex justify-center mt-4">
            <div className="w-7/12">
              <SearchInput name="search-input" placeholder={t("placeholder")} />
            </div>
          </div>

          <div className="mt-6 flex justify-center items-center mb-6">
            <div className="">
              <LanguageSwitcher />
            </div>
          </div>

          <div className="flex-col w-full mt-6 lg:mt-0">
            <div className="flex flex-col gap-4 items-center justify-center px-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {isLoading && <p>Cargando Pokémon...</p>}
                {isError && <p>Error al cargar los Pokémon.</p>}
                {allPokemons.map((pokemon) => (
                  <div className="flex justify-center" key={pokemon.name}>
                    <PokemonCard
                      name={pokemon.name}
                      imageSrc={pokemon.sprites.front_default}
                      types={pokemon.types.map((type) => type.type.name)}
                      abilities={pokemon.abilities.map(
                        (ability) => ability.ability.name
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Anterior
              </button>
              <span>
                Página {currentPage} de {totalPages}
              </span>
              <button
                type="button"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeSection;
