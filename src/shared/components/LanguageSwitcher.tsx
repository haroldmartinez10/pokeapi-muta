"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import React from "react";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const currentLocale = pathname.startsWith("/es") ? "es" : "en";

  const changeLanguage = (locale: string) => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${locale}`);
    router.push(newPath);
  };

  const t = useTranslations("HomePage");
  return (
    <div className="flex flex-col items-center gap-2 my-4 w-full  md:flex-row ">
      <button
        onClick={() => changeLanguage("es")}
        className={`px-4 py-2 rounded-lg font-bold transition-shadow 
          ${currentLocale === "es" ? "shadow-lg bg-gray-100" : "bg-gray-300"}`}
      >
        {t("translationES")}
      </button>
      <button
        onClick={() => changeLanguage("en")}
        className={`px-4 py-2 rounded-lg font-bold transition-shadow 
          ${currentLocale === "en" ? "shadow-lg bg-gray-100" : "bg-gray-300"}`}
      >
        {t("translationEN")}
      </button>
    </div>
  );
}
