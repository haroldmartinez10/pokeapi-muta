import React from "react";
import Image from "next/image";

type Ability = string;

type PokemonCardProps = {
  imageSrc: string;
  name: string;
  types: string[];
  abilities: Ability[];
};

const typeColors: Record<string, string> = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  grass: "#7AC74C",
  electric: "#F7D02C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dark: "#705848",
  steel: "#B7B7CE",
  fairy: "#D685AD",
  dragon: "#6F35FC",
};

const PokemonCard: React.FC<PokemonCardProps> = ({
  imageSrc,
  name,
  types,
  abilities,
}) => {
  return (
    <div className="font-sans bg-white rounded-3xl overflow-hidden border-8 border-[#4B5563] w-full h-[450px] shadow-lg transition-transform transform hover:scale-105">
      <div className="flex flex-col items-center">
        <Image
          src={imageSrc}
          alt={name}
          quality={100}
          width={200}
          height={200}
        />

        <h2 className="text-3xl font-extrabold capitalize text-[#4B5563] text-center mb-2">
          {name}
        </h2>
        <div className="flex gap-x-2 justify-center mb-2">
          {types?.map((type, index) => (
            <h2
              key={index}
              className="text-white font-bold rounded-full px-3 py-1"
              style={{
                backgroundColor: typeColors[type] || "#374151",
                boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
              }}
            >
              {type}
            </h2>
          ))}
        </div>
      </div>
      <section className="bg-[#E5E7EB] h-full p-4 flex flex-col gap-y-2">
        <div className="grid grid-cols-3 gap-2">
          {abilities?.map((ability, index) => (
            <div
              key={index}
              className="bg-[#F3F4F6] font-bold text-[#374151] p-2 rounded-lg text-sm text-center shadow-md transition-transform transform hover:scale-105"
            >
              {ability}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PokemonCard;
