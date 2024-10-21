import { useFormContext } from "react-hook-form";
import HomeSection from "./HomeSection";
import ListOfPokemons from "@/shared/components/ListOfPokemons";

const HomePage = () => {
  const { watch } = useFormContext();

  const isSearching = watch("search-input");

  return <>{!isSearching ? <HomeSection /> : <ListOfPokemons />}</>;
};

export default HomePage;
