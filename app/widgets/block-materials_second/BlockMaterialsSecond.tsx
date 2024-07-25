import React, { useContext, useEffect } from "react";
import { Block } from "@/app/features/block/Block";
import { EditingBlockContext } from "../editing-block";
import { Header } from "./ui";
import { useGetFiles, Role } from "@/app/shared/hooks/useGetFiles";
import { ListView } from "./ui/ListView";
import DocumentIcon from "@/public/svg/dock-icon.svg";
import InnerDownloadIcon from "@/public/svg/InnerDownloadIcon.svg";
import { Divider } from "antd";
import { useTranslation } from "react-i18next";
import { Loader } from "@/app/sign-in/[[...sign-in]]/ui";
import { UploadForm } from "./form/Form";

interface BlockMaterialsSecondProps {
  stageId: number;
  role: Role;
}

export const BlockMaterialsSecond: React.FC<BlockMaterialsSecondProps> = ({
  stageId,
  role,
}) => {
  const { t } = useTranslation();
  const id = "tasks_materials";
  const { editingBlockId, handleCancelEdit, handleEditBlock } =
    useContext(EditingBlockContext);
  const isEditing = editingBlockId === id;

  const { files, loading, refetch } = useGetFiles(stageId, role);

  useEffect(() => {
    return handleCancelEdit();
  }, []);

  useEffect(() => {
    refetch();
  }, [stageId, role]);

  const fileList = files.filter((file) => !file.link);
  const linkList = files.filter((file) => file.link);

  const handleEdit = () => {
    handleEditBlock(id);
  };

  const handleCancel = () => {
    handleCancelEdit();
  };

  const successHandle = () => {
    handleCancel();
    setTimeout(() => refetch(), 1000);
  };

  return (
    <Block isEditable={isEditing}>
      <Header editingBlockId={editingBlockId} handleEdit={handleEdit} />
      {isEditing ? (
        <UploadForm
          stageId={stageId}
          role={role}
          filesList={fileList}
          linksList={linkList}
          onCancel={handleCancel}
          onSuccess={successHandle}
          refetch={refetch}
        />
      ) : (
        <div className={`${loading ? "flex items-center justify-center" : ""}`}>
          {loading ? (
            <Loader />
          ) : (
            <div>
              {fileList.length >= 0 && (
                <ListView
                  title={t("workflow.materials.files")}
                  itemList={fileList}
                  Icon={DocumentIcon}
                />
              )}
              <Divider />
              {linkList.length >= 0 && (
                <ListView
                  title={t("workflow.materials.links")}
                  itemList={linkList}
                  Icon={InnerDownloadIcon}
                />
              )}
            </div>
          )}
        </div>
      )}
    </Block>
  );
};
