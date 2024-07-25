import React from "react";
import { TextEditor } from "@/app/features/text-editor/TextEditor";
import { Block } from "@/app/features/block/Block";
import { Label } from "../block-user";

export const BusinessCard = () => {
  const handleCancel = () => {};
  function textToFile(text: any, name: any) {
    const b = new Blob([text], { type: "text/plain" });

    const url = window.URL.createObjectURL(b);

    const a = document.createElement("a");

    a.href = url;

    a.download = name || "index.html";

    a.type = "text/plain";

    a.addEventListener("click", () => {
      setTimeout(() => window.URL.revokeObjectURL(url), 10000);
    });

    a.click();
  }

  const handleSaveText = (htmlContent: string) => {
    console.log("htmlContent", htmlContent);
    textToFile(htmlContent, "index.html");
  };
  return (
    <Block isEditable={false} classNames="flex-grow flex-shrink-1 basis-full">
      <div>
        <Label>Фамилия Имя</Label>
        <h2>Екатерина Кушнир</h2>
      </div>
      <div>
        <Label>Фото</Label>
        <h2>Екатерина Кушнир</h2>
      </div>
      <div>
        <Label>О себе</Label>
        <h2>Екатерина Кушнир</h2>
        <TextEditor
          text={"dddsdsdsds"}
          editable={true}
          handleCancel={handleCancel}
          handleSave={handleSaveText}
        />
      </div>
    </Block>
  );
};
