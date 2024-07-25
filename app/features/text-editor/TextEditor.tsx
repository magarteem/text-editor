import React from "react";
import { Editor } from "./editor";

export function TextEditor({
  text,
  editable,
  handleCancel,
  handleSave,
}: {
  text: string;
  editable: boolean;
  handleCancel: () => void;
  handleSave: (htmlContent: string) => void;
}) {
  return (
    <Editor
      text={text}
      editable={editable}
      handleCancel={handleCancel}
      handleSave={handleSave}
    />
  );
}
