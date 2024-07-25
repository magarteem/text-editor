import React from "react";
import { Input } from "@ui/index";
import { Checkbox } from "antd";
import RedCrossBigIcon from "@/public/svg/red-cross-big.svg";
import { useTranslation } from "react-i18next";
import { ClientEducation } from "@/app/shared";
import { TopTag } from "./TopTag";

export function Row({
  isEditable,
  data,
  index,
  remove,
}: {
  isEditable: boolean;
  data: any;
  index: number;
  remove?: any;
}) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-row gap-4 items-center w-full">
      <h1 className="text-sm text-gray font-semibold pr-2">{index + 1}</h1>
      {isEditable ? (
        <>
          <Input className="borderedSelect" value={data.university} />
          <div className="flex flex-row gap-2 items-center">
            <Checkbox />
            <h1 className="text-sm font-normal">
              {t("widgets.chosenUniversities.top")}
            </h1>
          </div>
          <button onClick={remove(index)}>
            <RedCrossBigIcon />
          </button>
        </>
      ) : (
        <h1 className="font-normal text-sm flex flex-row gap-2 overflow-hidden text-ellipsis">
          {data.university} {data.top && <TopTag />}
        </h1>
      )}
    </div>
  );
}
