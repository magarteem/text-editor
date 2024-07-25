import { StatusDocument } from "@/app/widgets/block-client-document/types/statusDocument";
import { Tag } from "antd";
import { useTranslation } from "react-i18next";

interface Props {
  type: StatusDocument;
}

export const StatusDocumentTag = ({ type }: Props) => {
  const { t } = useTranslation();
  type;
  switch (type) {
    case "CheckedByTheStrategist":
      return (
        <Tag color="#FADDE8">
          <p className="font-extrabold text-raspberries uppercase text-[9px] tracking-widest">
            {t("storage.docTypes.CheckedByTheStrategist")}
          </p>
        </Tag>
      );
    case "ReadyToBeSentToTheClient":
      return (
        <Tag color="#FFE5DD">
          <p className="font-extrabold text-orange-true uppercase text-[9px] tracking-widest">
            {t("storage.docTypes.ReadyToBeSentToTheClient")}
          </p>
        </Tag>
      );
    case "SentToClient":
      return (
        <Tag color="#CFF7D5">
          <p className="font-extrabold text-green uppercase text-[9px] tracking-widest">
            {t("storage.docTypes.SentToClient")}
          </p>
        </Tag>
      );
    case "WorkingWithCurator":
      return (
        <Tag color="#DAEDFB">
          <p className="font-extrabold text-sea-blue uppercase text-[9px] tracking-widest">
            {t("storage.docTypes.WorkingWithCurator")}
          </p>
        </Tag>
      );
    default:
      return null;
  }
};
