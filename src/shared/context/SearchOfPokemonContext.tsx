import React, { createContext, useState, ReactNode } from "react";

interface SearchOfPokemonContextType {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const SearchOfPokemonContext = createContext<
  SearchOfPokemonContextType | undefined
>(undefined);

interface SearchOfPokemonProviderProps {
  children: ReactNode;
}

export const SearchOfPokemonProvider: React.FC<
  SearchOfPokemonProviderProps
> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const value = {
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
  };

  return (
    <SearchOfPokemonContext.Provider value={value}>
      {children}
    </SearchOfPokemonContext.Provider>
  );
};

export const useSearchOfPokemonContext = () => {
  const context = React.useContext(SearchOfPokemonContext);
  if (context === undefined) {
    throw new Error(
      "useSearchOfPokemonContext must be used within a SearchOfPokemonProvider"
    );
  }
  return context;
};
