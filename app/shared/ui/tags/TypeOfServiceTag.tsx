import { Tag } from "antd";
import { useTranslation } from "react-i18next";

export const TypeOfServiceTag = ({ type }: { type?: string }) => {
  const { t } = useTranslation();

  switch (type) {
    case "FullSupport":
      return (
        <Tag color="#E7E8FF">
          <p className="font-bold text-blue-marian text-xs">
            {t("clients.typeOfService.FullSupport")}
          </p>
        </Tag>
      );
    case "Mentoring":
      return (
        <Tag color="#E3DDFF">
          <p className="font-bold text-purple text-xs">
            {t("clients.typeOfService.Mentoring")}
          </p>
        </Tag>
      );
    case "PersonalBrand":
      return (
        <Tag color="#FADDFF">
          <p className="font-bold text-violet text-xs">
            {t("clients.typeOfService.PersonalBrand")}
          </p>
        </Tag>
      );
    default:
      return <></>;
  }
};
