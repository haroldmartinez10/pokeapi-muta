import React from "react";
import Image from "next/image";

// Tipo para las habilidades, aquí se puede expandir en el futuro si es necesario
type Ability = string;

// Props del componente PokemonCard
type PokemonCardProps = {
  imageSrc: string; // URL de la imagen del Pokémon
  name: string; // Nombre del Pokémon
  types: string[]; // Tipos del Pokémon
  abilities: Ability[]; // Habilidades del Pokémon
};

// Mapa de tipos a colores
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
    <div className="font-sans bg-white rounded-3xl overflow-hidden border-[15px] border-[#4B5563] w-[100%] h-[450px] ">
      <div className="flex flex-col items-center">
        <div>
          <Image
            src={imageSrc}
            alt={name}
            quality={100}
            width={200}
            height={200}
          />
        </div>
      </div>
      <section className="bg-[#E5E7EB] h-full p-4 flex flex-col gap-y-2">
        <div className="flex gap-x-2">
          <h2 className="text-2xl font-bold capitalize">{name}</h2>
          {types.map((type, index) => (
            <h2
              key={index}
              className="text-white font-bold rounded-full px-2 py-1"
              style={{
                backgroundColor: typeColors[type] || "#374151", // Color de fondo basado en el tipo
              }}
            >
              {type}
            </h2>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2 items">
          {abilities.map((ability, index) => (
            <div
              key={index}
              className="bg-[#F3F4F6] font-bold text-[#374151] p-2 rounded-xl text-sm text-center"
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
