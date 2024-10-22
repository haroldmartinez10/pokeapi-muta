"use client";

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
