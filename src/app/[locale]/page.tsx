"use client";

import LanguageSwitcher from "@/shared/components/LanguageSwitcher";
import HomePage from "../components/HomePage";
import { BasicFormProvider } from "@/shared/components/BasicFormProvider";

export default function Page() {
  return (
    <>
      <BasicFormProvider>
        <HomePage />
      </BasicFormProvider>
    </>
  );
}
