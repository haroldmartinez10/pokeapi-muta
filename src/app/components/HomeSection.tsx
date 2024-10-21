import { pokemonData } from "@/shared/constants/pokemonData";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import SearchInput from "./SearchInput";
import LanguageSwitcher from "@/shared/components/LanguageSwitcher";
import { motion } from "framer-motion";
import PokemonCard from "./PokemonCard";

const HomeSection = () => {
  const t = useTranslations("HomePage");

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleCardClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % pokemonData.length);
  };

  return (
    <div className="relative flex items-center justify-center h-full md:h-screen xxl:h-screen">
      <div className="flex flex-col md:flex-row w-full md:w-10/12 lg:w-9/12 xl:w-8/12 text-center lg:text-left gap-x-6">
        <div className="flex flex-col justify-center w-full">
          <p className="text-6xl text-[#75747E] font-bold"> {t("title")}</p>
          <p className="text-5xl text-[#1A202C] font-semibold leading-[60px] text-center lg:text-left">
            {t("description")}
          </p>
          <div className="mt-6 w-full lg:w-9/12 px-2 xl:px-0">
            <SearchInput name="search-input" placeholder={t("placeholder")} />
          </div>
          <LanguageSwitcher />
        </div>

        <div className="flex justify-center items-center mt-6 md:mt-0">
          <motion.div
            className="cursor-pointer"
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={handleCardClick}
          >
            <PokemonCard
              imageSrc={pokemonData[currentIndex].imageSrc}
              name={pokemonData[currentIndex].name}
              type={pokemonData[currentIndex].type}
              description={pokemonData[currentIndex].description}
              stats={pokemonData[currentIndex].stats}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
