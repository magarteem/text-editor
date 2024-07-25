import React, { useContext } from "react";
import { TextEditor } from "@/app/features/text-editor/TextEditor";
import { Block } from "@/app/features/block/Block";
import { IStage } from "../block-workflow/Workflow-block";
import { EditingBlockContext } from "@/app/widgets/editing-block";
import BigPenIcon from "@/public/svg/big-pen.svg";
import { useTranslation } from "react-i18next";
import { usePatchStage } from "@/app/shared/hooks/usePatchStage";

export function BlockMaterials({
  stage,
  id,
  workflow,
  setWorkflow,
  setCurrentStage,
}: {
  stage: IStage;
  setCurrentStage: any;
  workflow: { name: string; stages: IStage[] };
  setWorkflow: (workflow: any) => void;
  id: string;
}) {
  const { t } = useTranslation();
  const { editingBlockId, handleEditBlock, handleCancelEdit } =
    useContext(EditingBlockContext);

  const isEditing = editingBlockId === id;
  const { patchStage } = usePatchStage();

  const handleEdit = () => {
    handleEditBlock(id);
  };

  const handleCancel = () => {
    handleCancelEdit();
  };

  const handleSaveText = async (htmlContent: string) => {
    handleCancel();
    await patchStage({ stageId: stage.id, internalDescription: htmlContent });
    setCurrentStage((prev: any) => ({
      ...prev,
      internalDescription: htmlContent,
    }));
    setWorkflow((prev: any) => ({
      ...prev,
      stages: prev.stages.map((s: IStage) =>
        s.id === stage.id ? { ...s, internalDescription: htmlContent } : s
      ),
    }));
  };

  return (
    <Block isEditable={false}>
      <div className="flex flex-row justify-between items-center text text-gray font-semibold">
        <h3>{t("workflow.tabs.materials")}</h3>
        {editingBlockId === null && (
          <button onClick={handleEdit}>
            <BigPenIcon />
          </button>
        )}
      </div>
      <TextEditor
        text={stage.internalDescription}
        editable={isEditing}
        handleCancel={handleCancel}
        handleSave={handleSaveText}
      />
    </Block>
  );
}
