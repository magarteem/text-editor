import React from "react";
import BigPenIcon from "@/public/svg/big-pen.svg";
import { useTranslation } from "react-i18next";
import { useStore } from "zustand";
import { useProfileStore } from "@store/index";

interface HeaderProps {
  editingBlockId: string | null;
  handleEdit: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  editingBlockId,
  handleEdit,
}) => {
  const { t } = useTranslation();
  const profile = useStore(useProfileStore);
  return (
    <div className="flex flex-row justify-between items-center text text-gray font-semibold">
      <h3>{t("workflow.materials.title")}</h3>
      {editingBlockId === null && profile?.roleType !== "Client" && (
        <button onClick={handleEdit}>
          <BigPenIcon />
        </button>
      )}
    </div>
  );
};
