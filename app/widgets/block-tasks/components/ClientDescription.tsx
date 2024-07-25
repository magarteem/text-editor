import React, { useContext } from "react";
import { Block } from "@/app/features/block/Block";
import { useTranslation } from "react-i18next";
import { EditingBlockContext } from "../../editing-block";
import { usePatchStage } from "@/app/shared/hooks/usePatchStage";
import BigPenIcon from "@/public/svg/big-pen.svg";
import { TextEditor } from "@/app/features/text-editor/TextEditor";
import { IStage } from "../../block-workflow/Workflow-block";

export function ClientDescription({
  stage,
  id,
  setWorkflow,
  setCurrentStage,
}: {
  stage: IStage;
  setCurrentStage: any;
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
    await patchStage({
      stageId: stage.id,
      externalDescription: htmlContent,
    });
    setCurrentStage((prev: any) => ({
      ...prev,
      externalDescription: htmlContent,
    }));
    setWorkflow((prev: any) => ({
      ...prev,
      stages: prev.stages.map((s: IStage) =>
        s.id === stage.id ? { ...s, externalDescription: htmlContent } : s
      ),
    }));
  };

  return (
    <Block isEditable={false}>
      <div className="flex flex-row justify-between items-center text text-gray font-semibold">
        <h3>{t("workflow.tasks.clientDescription")}</h3>
        {editingBlockId === null && (
          <button onClick={handleEdit}>
            <BigPenIcon />
          </button>
        )}
      </div>
      <TextEditor
        text={stage.externalDescription}
        editable={isEditing}
        handleCancel={handleCancel}
        handleSave={handleSaveText}
      />
    </Block>
  );
}
