import { Block } from "@/app/features/block/Block";
import { useState, useContext } from "react";
import { GetProfileResponse } from "@api/index";
import ChancesIcon from "@/public/svg/chances.svg";
import React from "react";
import { ChancesForm } from "./ChancesForm";
import { Content } from "./Content";
import { useTranslation } from "react-i18next";
import BigPenIcon from "@/public/svg/big-pen.svg";
import ToolTipIcon from "@/public/svg/tooltip.svg";
import { EditingBlockContext } from "../editing-block";
import { Tooltip } from "antd";

interface Props {
  profile: GetProfileResponse;
}

export const BlockChances = ({
  profile,
  id,
  isClient,
}: Props & { id: string; isClient?: boolean }) => {
  const { editingBlockId, handleEditBlock, handleCancelEdit } =
    useContext(EditingBlockContext);

  const isEditing = editingBlockId === id;

  const handleEdit = () => {
    handleEditBlock(id);
  };

  const handleCancel = () => {
    handleCancelEdit();
  };

  const [chances, setChances] = useState(profile.caseStatusChanceOfScholarship);
  const { t } = useTranslation();

  return (
    <Block isEditable={true} id={profile.id.toString()}>
      <div
        className={`flex flex-row items-center ${isClient ? "justify-start gap-2" : "justify-between"}`}
      >
        <div className="flex flex-row gap-2 items-center">
          <ChancesIcon />
          <h1 className="text-gray text-sm font-bold">
            {t("widgets.chances.title")}
          </h1>
        </div>
        {editingBlockId === null && !isClient && (
          <button onClick={handleEdit}>
            <BigPenIcon />
          </button>
        )}
        {isClient && (
          <Tooltip
            title={t("widgets.chances.tooltip")}
            className="cursor-pointer"
            color="#626C76"
          >
            <ToolTipIcon />
          </Tooltip>
        )}
      </div>
      {isEditing ? (
        <ChancesForm
          profile={profile}
          cancel={handleCancel}
          value={!!chances ? chances : 0}
          setValue={setChances}
        />
      ) : chances ? (
        <Content value={chances} />
      ) : (
        <p className="text-sm font-normal">
          {!isClient
            ? t("widgets.chances.noneAdmin")
            : t("widgets.chances.noneClient")}
        </p>
      )}
    </Block>
  );
};
