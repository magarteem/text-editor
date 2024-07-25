"use client";
import { useTranslation } from "react-i18next";
import { Curator } from "@/app/shared/modals/сreateNewDocumentModal/fields";
import { InfoBlock } from "../ui";
import { format } from "date-fns";
import { ResponseDocFileData } from "../types/type";

export function DocumentAuthor({ created, author }: ResponseDocFileData) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-2 gap-4  px-6 border-[#EAF0F5]">
      <Curator text={t("storage.formText.author")} user={author} />
      <InfoBlock
        title={t("storage.formText.dateOfСreation")}
        isEmpty={false}
        text={format(created, "dd.MM.yyyy, HH:mm")}
      />
    </div>
  );
}
