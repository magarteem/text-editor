import { useState, useContext } from "react";
import React from "react";
import { Block } from "@/app/features/block/Block";
import BigPenIcon from "@/public/svg/big-pen.svg";
import HatIcon from "@/public/svg/hat.svg";
import { Props } from "../block-user";
import { useTranslation } from "react-i18next";
import { Content } from "./Content";
import { EditingBlockContext } from "../editing-block";
import FormApplicationDetails from "./FormApplicationDetails";

export const BlockApplicationDetails = ({
  profile,
  id,
  isClient,
}: Props & { id: string; isClient?: boolean }) => {
  const { t } = useTranslation();
  const { editingBlockId, handleEditBlock, handleCancelEdit } =
    useContext(EditingBlockContext);

  const isEditing = editingBlockId === id;

  const handleEdit = () => {
    handleEditBlock(id);
  };

  const handleCancel = () => {
    handleCancelEdit();
  };

  const [applicationInfo, setApplicationInfo] = useState(profile);

  if (isClient && !applicationInfo.targetDetailsTypeOfService) {
    return null;
  }

  const hasApplicationDetails =
    applicationInfo.targetDetailsStartDate ||
    applicationInfo.targetDetailsEndDate ||
    applicationInfo.targetDetailsCountryForAdmission.length ||
    applicationInfo.targetDetailsTypeOfService ||
    applicationInfo.targetDetailsPersonDegree ||
    applicationInfo.targetDetailsNumberOfTopUniversities ||
    applicationInfo.targetDetailsYear ||
    applicationInfo.targetDetailsProgram ||
    applicationInfo.targetDetailsNumberOfUniversities;

  return (
    <Block isEditable={false} id="2">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row gap-2 items-center">
          <HatIcon />
          <h1 className="text-gray font-semibold">
            {t("widgets.ApplicationDetails.title")}
          </h1>
        </div>
        {editingBlockId == null && !isClient && (
          <button onClick={handleEdit} className="flex flex-row gap-2">
            {!hasApplicationDetails && (
              <p className="font-sm font-semibold text-blue-highlight">
                Добавить детали поступления
              </p>
            )}
            <BigPenIcon />
          </button>
        )}
      </div>
      {isEditing ? (
        <FormApplicationDetails
          cancel={handleCancel}
          profile={applicationInfo}
          setProfile={setApplicationInfo}
        />
      ) : (
        hasApplicationDetails && <Content profile={applicationInfo} />
      )}
    </Block>
  );
};
