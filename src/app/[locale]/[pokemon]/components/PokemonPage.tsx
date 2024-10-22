"use client";
import { useGetPokemonByName } from "@/api/useQueryHooks";
import PokemonCard from "@/app/components/PokemonCard";
import Spinner from "@/shared/components/Spinner";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

const PokemonPage = () => {
  const params = useParams();
  const router = useRouter();
  const { pokemon } = params;

  const { data, isLoading } = useGetPokemonByName(pokemon as string);

  const pokemonName = data?.forms[0]?.name || "";
  const pokemonImageSrcBack = data?.sprites?.back_default || "";
  const pokemonImageSrcFront = data?.sprites?.front_default || "";
  const pokemonTypes = data?.types?.map((type) => type.type.name) || [];
  const pokemonAbilities =
    data?.abilities?.map((ability) => ability.ability.name) || [];

  const [isFront, setIsFront] = useState(true);

  const handleImageToggle = () => {
    setIsFront((prev) => !prev);
  };

  const handleGoBack = () => {
    router.back();
  };

  const t = useTranslations("Card");

  return (
    <>
      <div className="w-full flex justify-center items-center px-4 md:px-0 mt-14">
        <div className="w-full max-w-md cursor-pointer">
          {isLoading ? (
            <div className="flex flex-col justify-center items-center">
              <Spinner />
            </div>
          ) : (
            <div className="w-full  flex  flex-col gap-y-4">
              <div className="flex justify-between">
                <button
                  onClick={handleGoBack}
                  className="p-2 px-4 bg-gray-500 text-white rounded-full font-bold"
                >
                  {t("goBack")}
                </button>
                <button
                  onClick={handleImageToggle}
                  className="p-2 px-4 bg-blue-500 text-white rounded-full font-bold"
                >
                  {isFront ? t("showBack") : t("showFront")}
                </button>
              </div>
              <PokemonCard
                name={pokemonName}
                imageSrc={isFront ? pokemonImageSrcFront : pokemonImageSrcBack}
                types={pokemonTypes}
                abilities={pokemonAbilities}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PokemonPage;
