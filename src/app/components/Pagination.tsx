import { useTranslations } from "next-intl";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handleNextPage: () => void;
  handlePrevPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  handleNextPage,
  handlePrevPage,
}) => {
  const t = useTranslations("Pagination");
  return (
    <div className="flex items-center justify-between mt-6">
      <button
        type="button"
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className={`${
          currentPage === 1
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-red-600 hover:bg-red-700 text-white"
        } px-4 py-2 rounded-md transition duration-200`}
      >
        {t("previous")}
      </button>

      <span className="text-lg font-medium">
        {t("page")} {currentPage} {t("of")} {totalPages}
      </span>

      <button
        type="button"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={`${
          currentPage === totalPages
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-red-600 hover:bg-red-700 text-white"
        } px-4 py-2 rounded-md transition duration-200`}
      >
        {t("next")}
      </button>
    </div>
  );
};

export default Pagination;
