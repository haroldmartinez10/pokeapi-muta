"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

type Locale = "es" | "en";

const useLanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale: Locale = pathname.startsWith("/es") ? "es" : "en";

  const changeLanguage = (locale: Locale) => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${locale}`);
    router.push(newPath);
  };

  return {
    currentLocale,
    changeLanguage,
  };
};

export default useLanguageSwitcher;
