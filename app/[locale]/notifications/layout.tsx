import { PropsWithChildren } from "react";
import initTranslations from "@/lib/i18n/i18n";
import { TranslationsProvider } from "@providers/index";

const i18nNamespaces = ["profile"];

interface Props {
  params: { locale: string };
}

export default async function Layout({
  children,
  params: { locale },
}: PropsWithChildren<Props>) {
  const { resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      {children}
    </TranslationsProvider>
  );
}
