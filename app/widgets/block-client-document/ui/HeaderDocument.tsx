import DockIcon from "@/public/svg/document-bcg.svg";
import LinkDoc from "@/public/svg/link-doc.svg";
import BigPenIcon from "@/public/svg/big-pen.svg";
import { useTranslation } from "react-i18next";

interface Props {
  handleEdit: () => void;
  isEditing: boolean;
  myProfileId: number;
  authorDocumentId: number;
  link: string | null;
}

export const HeaderDocument = ({
  handleEdit,
  isEditing,
  myProfileId,
  authorDocumentId,
  link,
}: Props) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between px-6">
      <div className="flex flex-row gap-2 items-center">
        {link ? <LinkDoc /> : <DockIcon />}
        <h1 className="text-gray font-bold">
          {t("storage.formText.mainTitle")}
        </h1>
      </div>

      {/*{!isEditing && myProfileId === authorDocumentId && (*/}
      {!isEditing && (
        <button onClick={handleEdit} className="flex flex-row gap-2">
          <BigPenIcon />
        </button>
      )}
    </div>
  );
};
