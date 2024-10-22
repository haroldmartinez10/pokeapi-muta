import Spinner from "@/shared/components/Spinner";
import SearchSvg from "@/shared/svg/SearchSvg";
import React, { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";

interface SearchInputProps {
  placeholder?: string;
  name: string;
  loading?: boolean; // Agregar la prop loading
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Buscar un Pokémon",
  name,
  loading = false,
}) => {
  const { register } = useFormContext();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="relative">
      <div className="flex items-center">
        <div className="absolute flex items-center pl-4 pointer-events-none">
          <SearchSvg />
        </div>
        <input
          {...register(name)}
          ref={(e) => {
            register(name).ref(e);
            inputRef.current = e;
          }}
          className="block w-full p-4 pl-10 text-sm text-black border border-gray-700 rounded-full bg-white dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder={placeholder}
          required
          style={{ outline: "black" }}
        />
        {loading && (
          <div className="absolute right-4">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
