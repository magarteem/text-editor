import { Dropdown } from "antd";
import React, { ReactNode } from "react";
import CrossIcon from "@/public/svg/blue-cross.svg";
import Upload from "@/public/svg/upload.svg";
import { useModal } from "@/app/shared/modals/modal/ModalProvider";
import { useTranslation } from "react-i18next";
import { useProfileStore } from "@/app/shared/store/profile/useProfileStore";
import { useStore } from "zustand";

interface OptionListType {
  key: string;
  label: ReactNode;
}
interface Props {
  parentId: number | null;
}
export const DropdownList = ({ parentId }: Props) => {
  const profile = useStore(useProfileStore);
  const { t } = useTranslation();
  const { openModal } = useModal();

  const styleWrapTable = {
    classNames: "max-w-[692px]",
    classNamesClosed: "hidden",
    parentId,
  };
  const items: OptionListType[] = [
    {
      key: "profileCreated",
      label: (
        <p
          className="text-xs text-gray px-3 font-bold py-[3px]"
          onClick={() => openModal("createNewDirectoryModal", styleWrapTable)}
        >
          {t("storage.create.catalog")}
        </p>
      ),
    },
    {
      key: "targetDetailsStartDate",
      label: (
        <p
          className="text-xs text-gray px-3 font-bold py-[3px]"
          onClick={() =>
            openModal("createNewDocumentModal", {
              ...styleWrapTable,
              role: profile?.roleType,
            })
          }
        >
          {t("storage.create.documentFile")}
        </p>
      ),
    },
    {
      key: "targetDetailsEndDate",
      label: (
        <p
          className="text-xs text-gray px-3 font-bold py-[3px]"
          onClick={() =>
            openModal("createNewDocumentModalAsLink", {
              ...styleWrapTable,
              role: profile?.roleType,
            })
          }
        >
          {t("storage.create.documentLink")}
        </p>
      ),
    },
  ];

  return (
    <div className="pt-6 pb-4 px-6 text-sm font-bold text-blue-highlight">
      {profile?.roleType !== "Client" ? (
        <Dropdown
          menu={{
            items,
            selectable: true,
            style: { padding: "16px 0" },
            className: "px-0",
          }}
          className="py-0 px-0"
        >
          <button className="flex flex-row gap-2 items-center">
            <CrossIcon />
            <h1>{t("clients.create")}</h1>
          </button>
        </Dropdown>
      ) : (
        <button
          className="flex flex-row gap-2 items-center"
          onClick={() =>
            openModal("createNewDocumentModal", {
              ...styleWrapTable,
              role: profile.roleType,
              myUserId: profile?.id,
            })
          }
        >
          <Upload />
          <h1>{t("clients.upload")}</h1>
        </button>
      )}
    </div>
  );
};
