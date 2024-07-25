import { Tag } from "antd";
import { useTranslation } from "react-i18next";
import { RoleType } from "../../api";
export const TypeOfCommentsTag = ({ type }: { type: RoleType }) => {
  const { t } = useTranslation();

  const element = (text: string) => {
    return (
      <Tag color="#F3F7FA">
        <p className="font-extrabold text-gray uppercase text-[9px] tracking-widest">
          {text}
        </p>
      </Tag>
    );
  };

  switch (type) {
    case "Curator":
      return element(t("storage.comment.authorCommit.curator"));
    case "Administrator":
      return element(t("storage.comment.authorCommit.administrator"));
    case "Client":
      return element(t("storage.comment.authorCommit.client"));
    case "Strategist":
      return element(t("storage.comment.authorCommit.strategist"));
    default:
      return element(t("storage.comment.authorCommit.notFound"));
  }
};
