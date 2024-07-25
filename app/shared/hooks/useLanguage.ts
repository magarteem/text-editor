import { useTranslation } from "react-i18next";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { Locales } from "@/lib/i18n/i18nConfig";

export const useLanguage = () => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const currentPathname = usePathname();

  const lang = i18n.language;

  const onChangeLanguage = useCallback(
    (locale: Locales) => {
      const days = 30;
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie = `NEXT_LOCALE=${locale};expires=${date.toUTCString()};path=/`;

      router.push(currentPathname.replace(lang, locale));

      router.refresh();
    },
    [lang, currentPathname, router],
  );

  return { lang, onChangeLanguage };
};
