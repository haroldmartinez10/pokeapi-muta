"use client";

import React from "react";
import useLanguageSwitcher from "../hooks/useLanguageSwitcher";
import { useTranslations } from "next-intl";

export default function LanguageSwitcher() {
  const { currentLocale, changeLanguage } = useLanguageSwitcher();

  const t = useTranslations("HomePage");

  return (
    <div className="flex gap-x-3">
      <button
        type="button"
        onClick={() => changeLanguage("es")}
        className={`px-4 py-2 rounded-lg font-bold transition-shadow 
          ${currentLocale === "es" ? "shadow-lg bg-gray-100" : "bg-gray-300"}`}
      >
        {t("translationES")}
      </button>
      <button
        type="button"
        onClick={() => changeLanguage("en")}
        className={`px-4 py-2 rounded-lg font-bold transition-shadow 
          ${currentLocale === "en" ? "shadow-lg bg-gray-100" : "bg-gray-300"}`}
      >
        {t("translationEN")}
      </button>
    </div>
  );
}
