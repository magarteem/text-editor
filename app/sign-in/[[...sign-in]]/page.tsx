import { PageInner } from "./pageInner";
import { TranslationsProvider } from "@providers/index";
import initTranslations from "@/lib/i18n/i18n";

const i18nNamespaces = ["profile", "common"];

export default async function Page({
  searchParams,
}: {
  searchParams: { lang?: string };
}) {
  const lang = searchParams.lang || "ru";
  const { resources } = await initTranslations(lang, i18nNamespaces);

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={lang}
      resources={resources}
    >
      <PageInner initialLang={lang} />
    </TranslationsProvider>
  );
}
