import { useTranslation } from "react-i18next";

export function useTypeOfDegree(degree: string) {
  const { t } = useTranslation();

  switch (degree) {
    case "Master":
      return t("clients.degree.master");
    case "Bachelor":
      return t("clients.degree.bachelor");
    case "GraduateStudent":
      return t("clients.degree.graduateStudent");
    default:
      return t("clients.table.defaultValues.degree");
  }
}
