import React from "react";
import { render, screen } from "@testing-library/react";
import PokemonCard from "@/app/components/PokemonCard";

const mockPokemon = {
  imageSrc: "https://example.com/pokemon.png",
  name: "Pikachu",
  types: ["electric"],
  abilities: ["Static", "Lightning Rod"],
};

describe("PokemonCard Component", () => {
  test("renders PokemonCard with correct data", () => {
    render(
      <PokemonCard
        imageSrc={mockPokemon.imageSrc}
        name={mockPokemon.name}
        types={mockPokemon.types}
        abilities={mockPokemon.abilities}
      />
    );

    expect(screen.getByText("Pikachu")).toBeInTheDocument();

    const typeElement = screen.getByText("electric");
    expect(typeElement).toBeInTheDocument();
    expect(typeElement).toHaveStyle({ backgroundColor: "#F7D02C" });

    mockPokemon.abilities.forEach((ability) => {
      expect(screen.getByText(ability)).toBeInTheDocument();
    });
  });

  test("renders fallback background color for unknown types", () => {
    render(
      <PokemonCard
        imageSrc={mockPokemon.imageSrc}
        name={mockPokemon.name}
        types={["unknown-type"]}
        abilities={mockPokemon.abilities}
      />
    );

    const typeElement = screen.getByText("unknown-type");
    expect(typeElement).toHaveStyle({ backgroundColor: "#374151" });
  });
});
