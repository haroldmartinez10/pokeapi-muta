import React from "react";
import { render, screen } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import SearchInput from "@/app/components/SearchInput";

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("SearchInput Component", () => {
  test("renders SearchInput with placeholder", () => {
    render(
      <Wrapper>
        <SearchInput name="search" />
      </Wrapper>
    );

    expect(
      screen.getByPlaceholderText("Buscar un Pokémon")
    ).toBeInTheDocument();
  });

  test("renders loading spinner when loading is true", () => {
    render(
      <Wrapper>
        <SearchInput name="search" loading={true} />
      </Wrapper>
    );
  });

  test("does not render loading spinner when loading is false", () => {
    render(
      <Wrapper>
        <SearchInput name="search" loading={false} />
      </Wrapper>
    );

    // Verifica que el spinner no se renderiza cuando loading es false
    expect(screen.queryByRole("spinner")).not.toBeInTheDocument();
  });

  test("focuses the input on mount", () => {
    render(
      <Wrapper>
        <SearchInput name="search" />
      </Wrapper>
    );

    const input = screen.getByPlaceholderText(
      "Buscar un Pokémon"
    ) as HTMLInputElement;
    expect(document.activeElement).toBe(input);
  });
});
