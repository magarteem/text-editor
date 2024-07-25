import { useTranslation } from "react-i18next";

export function useTypeOfService(typeOfService: string) {
  const { t } = useTranslation();

  switch (typeOfService) {
    case "FullSupport":
      return t("clients.typeOfServiceFull.FullSupport");
    case "Mentoring":
      return t("clients.typeOfServiceFull.Mentoring");
    case "PersonalBrand":
      return t("clients.typeOfServiceFull.PersonalBrand");
    default:
      return t("clients.table.defaultValues.type");
  }
}
