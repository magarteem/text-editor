import { useTranslation } from "react-i18next";

export function useTypeOfClient(type: string) {
  const { t } = useTranslation();

  switch (type) {
    case "Strong":
      return t("clients.types.strong");
    case "Weak":
      return t("clients.types.weak");
    case "Questionable":
      return t("clients.types.questionable");
    default:
      return t("clients.table.defaultValues.type");
  }
}
