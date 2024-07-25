"use client";
import { TextEditor } from "../features/text-editor/TextEditor";

export default async function Page() {
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
    <div className="min-h-[100vh]  bg-blue-ukrainian">
      <div className="max-w-[50vw] min-h-[90vh] m-auto bg-gray-bright">
        <TextEditor
          text={""}
          editable={true}
          handleCancel={handleCancel}
          handleSave={handleSaveText}
        />
      </div>
    </div>
  );
}
