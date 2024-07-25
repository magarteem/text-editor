import { PropsWithChildren } from "react";
import { OtherProviders } from "@providers/index";
import { Locales } from "@/lib/i18n/i18nConfig";
import { MainLayout } from "../layouts/main-layout/MainLayout";
import { TranslationsProvider } from "@providers/index";
import { Metadata } from "next";
import { useServerProvider } from "@/app/shared/hooks/useServerProvider";
import initTranslations from "@/lib/i18n/i18n";
import { DataFetching } from "./DataFetching";
import { Subscribes } from "@/app/[locale]/Subscribes";
import { ModalWrapper } from "./ModalWrapper";

export const metadata: Metadata = {
  title: "Self Start Global",
};

const i18nNamespaces = ["profile"];

type Props = { params: { locale: Locales } };

export default async function Layout({
  children,
  params,
}: PropsWithChildren<Props>) {
  useServerProvider<Locales>("locale", params.locale);
  const { resources } = await initTranslations(params.locale, i18nNamespaces);

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={params.locale}
      resources={resources}
    >
      <OtherProviders>
        <DataFetching />
        <Subscribes />
        <MainLayout>
          <ModalWrapper>{children}</ModalWrapper>
        </MainLayout>
      </OtherProviders>
    </TranslationsProvider>
  );
}
