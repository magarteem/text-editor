"use client";

import { I18nextProvider } from "react-i18next";
import { PropsWithChildren } from "react";
import { createInstance, Resource } from "i18next";
import initTranslations from "@/lib/i18n/i18n";

type Props = {
  locale: string;
  namespaces: string[];
  resources: Resource;
};

export function TranslationsProvider({
  children,
  locale,
  namespaces,
  resources,
}: PropsWithChildren<Props>) {
  const i18n = createInstance();

  initTranslations(locale, namespaces, i18n, resources);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
