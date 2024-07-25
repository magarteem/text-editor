import { useLanguage } from "@hooks/index";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const useRouterHandler = () => {
  const { lang } = useLanguage();
  const router = useRouter();

  const onChangeRoute = useCallback(
    (href: string) => {
      router.push("/" + lang + href);
    },
    [lang, router],
  );

  return { onChangeRoute };
};
