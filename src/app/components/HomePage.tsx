import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";
import SearchInput from "./SearchInput";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/shared/components/LanguageSwitcher";

const HomePage = () => {
  const t = useTranslations("HomePage");
  const pokemonData = [
    {
      imageSrc: "/images/bulbasaur.png",
      name: "Bulbasaur",
      type: "Grass",
      description: "Seed Pokemon",
      stats: ["HP 1071", "CP 951", "W 0.79m", "Water", "Electric", "Fire"],
    },
    {
      imageSrc: "/images/charmander.png",
      name: "Charmander",
      type: "Fire",
      description: "Lizard Pokemon",
      stats: ["HP 1000", "CP 900", "W 0.60m", "Water", "Electric", "Grass"],
    },
    {
      imageSrc: "/images/squirtle.png",
      name: "Squirtle",
      type: "Water",
      description: "Tiny Turtle Pokemon",
      stats: ["HP 950", "CP 850", "W 0.50m", "Grass", "Electric", "Fire"],
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % pokemonData.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [pokemonData.length]);

  return (
    <div className="relative flex items-center justify-center h-full md:h-screen xxl:h-screen">
      {/* Language Switcher positioned absolutely in the top-left corner */}

      <div className="flex flex-col md:flex-row w-full md:w-10/12 lg:w-9/12 text-center lg:text-left gap-x-6">
        <div className="flex flex-col justify-center w-full">
          <p className="text-6xl text-[#75747E] font-bold"> {t("title")}</p>
          <p className="text-5xl text-[#1A202C] font-semibold leading-[60px] text-center lg:text-left">
            {t("description")}
          </p>
          <div className="mt-6 w-full lg:w-9/12 px-2 xl:px-0">
            <SearchInput placeholder={t("placeholder")} />
          </div>
          <LanguageSwitcher />
        </div>

        <div className="flex justify-center items-center mt-6 md:mt-0">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
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

export default HomePage;
