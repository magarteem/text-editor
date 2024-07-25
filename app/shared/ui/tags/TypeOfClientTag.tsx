import { Tag } from "antd";
import { useTranslation } from "react-i18next";

export const TypeOfClientTag = ({ type }: { type: string }) => {
  const { t } = useTranslation();

  switch (type) {
    case "Strong":
      return (
        <Tag color="#CFF7D5">
          <p className="font-extrabold text-green-black uppercase text-[9px] tracking-widest">
            {t("clients.types.strong")}
          </p>
        </Tag>
      );
    case "Weak":
      return (
        <Tag color="#FBEDD0">
          <p className="font-extrabold text-yellow-deep uppercase text-[9px] tracking-widest">
            {t("clients.types.weak")}
          </p>
        </Tag>
      );
    case "Questionable":
      return (
        <Tag color="#FFD2C4">
          <p className="font-extrabold text-orange-giants uppercase text-[9px] tracking-widest">
            {t("clients.types.questionable")}
          </p>
        </Tag>
      );
    default:
      return (
        <p className="text-sm text-gray opacity-60 whitespace-nowrap text-ellipsis">
          {t("clients.table.defaultValues.type")}
        </p>
      );
  }
};
