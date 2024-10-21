import React from "react";
import Image from "next/image";

interface PokemonCardProps {
  imageSrc: string;
  name: string;
  type: string;
  description: string;
  stats: string[];
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  imageSrc,
  name,
  type,
  description,
  stats,
}) => {
  return (
    <div className="font-sans bg-white rounded-3xl overflow-hidden border-[15px] border-[#4B5563] w-[350px] h-[520px]">
      <div className="flex flex-col items-center">
        <div className="">
          <Image
            src={imageSrc}
            alt={name}
            quality={100}
            width={350}
            height={350}
          />
        </div>
      </div>
      <section className="bg-[#E5E7EB] h-full p-4 flex flex-col gap-y-2">
        <div className="flex gap-x-2">
          <h2 className="text-2xl font-bold capitalize">{name}</h2>
          <h2
            className={`bg-[#374151] text-white font-bold rounded-full px-2 py-1`}
          >
            {type}
          </h2>
        </div>
        <div className="text-[#374151] font-semibold">{description}</div>
        <div className="grid grid-cols-3 gap-2 items">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-[#F3F4F6] font-bold text-[#374151] p-2 rounded-xl text-sm text-center"
            >
              {stat}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PokemonCard;
