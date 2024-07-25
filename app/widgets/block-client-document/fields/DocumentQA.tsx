"use client";
import { useTranslation } from "react-i18next";
import { Curator } from "@/app/shared/modals/сreateNewDocumentModal/fields";
import IconDone from "@/public/svg/green.svg";
import Equals from "@/public/svg/equals.svg";
import DoubleArrowUp from "@/public/svg/double-arrow-up.svg";

import { InfoBlockIcon } from "../ui/InfoBlockIcon";
import { InfoBlock } from "../ui";
import { ResponseDocFileData } from "../types/type";
import { format } from "date-fns";

type TypeSelectorStatus = "Standard" | "High";

export function DocumentQA({
  reviewPriority,
  startDate,
  approvedByStrategist,
  checkingStrategist,
}: ResponseDocFileData) {
  const { t } = useTranslation();

  const lib: Record<TypeSelectorStatus, string> = {
    Standard: t("storage.formText.reviewPriority.Standard"),
    High: t("storage.formText.reviewPriority.High"),
  };

  return (
    <div className="grid grid-cols-2 gap-4  px-6 border-t-2 border-b-2 py-4 border-[#EAF0F5]">
      <InfoBlockIcon
        title={t("storage.formText.select.scanPriority")}
        isEmpty={false}
        text={lib[reviewPriority]}
        element={reviewPriority === "Standard" ? <Equals /> : <DoubleArrowUp />}
      />

      <InfoBlock
        title={t("storage.formText.select.hiringDate")}
        isEmpty={false}
        text={
          startDate
            ? format(startDate, "dd.MM.yyyy, HH:mm")
            : t("storage.formText.select.NoInformation")
        }
      />

      {checkingStrategist ? (
        <Curator
          text={t("storage.formText.select.checkingStrategist")}
          user={checkingStrategist}
        />
      ) : (
        <InfoBlockIcon
          title={t("storage.formText.select.checkingStrategist")}
          isEmpty={false}
          text={t("storage.formText.typeOfDocument.NotSelected")}
        />
      )}

      <InfoBlockIcon
        title={t("storage.formText.select.qualityControl")}
        isEmpty={false}
        text={
          approvedByStrategist
            ? t("storage.formText.select.ApprovedByStrategist")
            : t("storage.formText.select.NoInformation")
        }
        element={approvedByStrategist ? <IconDone /> : null}
      />
    </div>
  );
}
