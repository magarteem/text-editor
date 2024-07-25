import React from "react";
import { Block } from "@/app/features/block/Block";
import { Label } from "../block-user";
import { useTranslation } from "react-i18next";
import LinkIcon from "@/public/svg/InnerDownloadIcon.svg";
import { tempDataDoc } from "./helpers/dataDocument";
import { ItemDocument } from "./ui/ItemDocument";

export const Documentation = () => {
  const { t } = useTranslation();

  return (
    <Block isEditable={false} classNames="flex-grow flex-shrink-1 basis-full">
      <Label>
        <div className="flex items-center gap-2">
          <LinkIcon />
          {t("settings.documentation.title")}
        </div>
      </Label>

      <div className="flex flex-col gap-2">
        {tempDataDoc.map((x) => (
          <ItemDocument key={x.id} item={x} text={t(x.title)} />
        ))}
      </div>
    </Block>
  );
};
