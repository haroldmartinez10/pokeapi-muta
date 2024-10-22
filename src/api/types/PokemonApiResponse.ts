import { PokemonAbility } from "./PokemonAbility";
import { PokemonForm } from "./PokemonForm";
import { PokemonSprite } from "./PokemonSprite";
import { PokemonType } from "./PokeymonType";

export type PokemonApiResponse = {
  name: string;
  sprites: PokemonSprite;
  abilities: PokemonAbility[];
  types: PokemonType[];
  forms: PokemonForm[];
};
