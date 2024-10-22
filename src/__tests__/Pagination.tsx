import React from "react";
import { render, screen } from "@testing-library/react";

import Pagination from "@/app/components/Pagination";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

describe("Pagination Component", () => {
  test("renders Pagination component", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        handleNextPage={() => {}}
        handlePrevPage={() => {}}
      />
    );

    expect(screen.getByText("page 1 of 5")).toBeInTheDocument();
    expect(screen.getByText("previous")).toBeInTheDocument();
    expect(screen.getByText("next")).toBeInTheDocument();
  });
});
