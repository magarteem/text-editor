import { Block } from "@/app/features/block/Block";
import React, { useContext, useEffect } from "react";
import { IStage } from "../block-workflow/Workflow-block";
import { EditingBlockContext } from "../editing-block";

export function BlockMethodology({
  stage,
  isClient = false,
}: {
  stage: IStage;
  isClient?: boolean;
}) {
  const { handleCancelEdit } = useContext(EditingBlockContext);

  useEffect(() => {
    return handleCancelEdit();
  }, []);
  return (
    <Block isEditable={false}>
      <div className="prose w-full max-w-none">
        <div
          dangerouslySetInnerHTML={{
            __html: isClient
              ? stage.externalDescription
              : stage.internalDescription,
          }}
        />
      </div>
    </Block>
  );
}
