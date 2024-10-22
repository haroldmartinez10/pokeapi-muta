"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import SearchInput from "./SearchInput";
import LanguageSwitcher from "@/shared/components/LanguageSwitcher";
import PokemonCard from "./PokemonCard";
import { useGetPokemonByName, useGetPokemons } from "@/api/useQueryHooks";
import { useFormContext } from "react-hook-form";
import { useDebounce } from "@uidotdev/usehooks";
import Pagination from "./Pagination";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import Spinner from "@/shared/components/Spinner";

const HomeSection = () => {
  const t = useTranslations("HomePage");

  const e = useTranslations("Errors");
  const params = useParams();
  const { locale } = params;

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

  const { data, isFetching } = useGetPokemonByName(debounceSearch || "");
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

  const router = useRouter();

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: () => ({
      opacity: 1,
      y: 0,
    }),
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex-col justify-center items-center w-full">
        <div className="w-full flex flex-col items-center">
          <p className="text-6xl text-[#75747E] font-bold text-center mt-9">
            {t("title")}
          </p>
          <p className="text-4xl flex mt-4 text-center ">{t("description")}</p>
        </div>

        <div className="w-full flex justify-center mt-4">
          <div className="w-7/12">
            <SearchInput
              loading={isFetching}
              name="search-input"
              placeholder={t("placeholder")}
            />
          </div>
        </div>

        {isSearching && (
          <div className="flex flex-col items-center w-full mt-4">
            {pokemonName ? (
              <div
                onClick={() => {
                  router.push(`/${locale}/${pokemonName}`);
                }}
                className="w-full xl:w-3/12 md:w-6/12 px-4 cursor-pointer"
              >
                <PokemonCard
                  name={pokemonName}
                  imageSrc={pokemonImageSrc}
                  types={pokemonTypes}
                  abilities={pokemonAbilities}
                />
              </div>
            ) : (
              <p>{e("notPokemonFound")}</p>
            )}
          </div>
        )}

        {!isSearching ? (
          <div className="mt-6 flex justify-center items-center mb-6">
            <LanguageSwitcher />
          </div>
        ) : null}

        <div className="flex-col w-full mt-6 lg:mt-0">
          <div className="flex flex-col gap-4 items-center justify-center px-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {isLoading && <Spinner />}
              {isError && <p>{e("errorLoadPokemon")}</p>}
              {!isSearching &&
                allPokemons.map((pokemon, index) => (
                  <motion.div
                    key={pokemon.name}
                    className="flex justify-center cursor-pointer"
                    initial="hidden"
                    whileInView="visible"
                    variants={cardVariants}
                    custom={index}
                    viewport={{ once: true }}
                    onClick={() => {
                      router.push(`/${locale}/${pokemon.name}`);
                    }}
                  >
                    <PokemonCard
                      name={pokemon.name}
                      imageSrc={pokemon.sprites.front_default}
                      types={pokemon.types.map((type) => type.type.name)}
                      abilities={pokemon.abilities.map(
                        (ability) => ability.ability.name
                      )}
                    />
                  </motion.div>
                ))}
            </div>
          </div>
          <div className="w-full flex justify-center">
            <div className="w-full xl:w-3/12 md:w-6/12 lg:w-5/12 mb-4">
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                handleNextPage={handleNextPage}
                handlePrevPage={handlePrevPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
