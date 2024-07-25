import { Config } from "next-i18n-router/dist/types";

export type Locales = "en" | "ru";
export const locales: Locales[] = ["en", "ru"];

const i18nConfig: Config = {
  locales,
  defaultLocale: "en",
};

export default i18nConfig;
