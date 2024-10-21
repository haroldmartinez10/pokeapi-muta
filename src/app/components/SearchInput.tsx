import SearchSvg from "@/shared/svg/SearchSvg";
import React from "react";

interface SearchInputProps {
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Buscar un Pokémon",
}) => {
  return (
    <div className="relative">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-white sr-only dark:text-white"
      >
        Search
      </label>
      <div className="flex items-center">
        <div className="absolute  flex items-center pl-4 pointer-events-none">
          <SearchSvg />
        </div>
        <input
          id="default-search"
          className="block w-full p-4 pl-10 text-sm text-black border border-gray-700 rounded-full bg-white dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder={placeholder}
          required
          style={{ outline: "black" }}
        />
      </div>
    </div>
  );
};

export default SearchInput;
