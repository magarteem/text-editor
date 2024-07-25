"use client";

import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { Toolbar } from "./Toolbar";
import { Color } from "@tiptap/extension-color";
import cn from "classnames";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import Youtube from "@tiptap/extension-youtube";
import Dropcursor from "@tiptap/extension-dropcursor";
import ImageResize from "tiptap-extension-resize-image";
import Image from "@tiptap/extension-image";
import Details from "@tiptap-pro/extension-details";
import DetailsContent from "@tiptap-pro/extension-details-content";
import DetailsSummary from "@tiptap-pro/extension-details-summary";
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from "@ui/index";
import { useTranslation } from "react-i18next";

export const Editor = ({
  text,
  editable,
  handleCancel,
  handleSave,
}: {
  text: string;
  editable: boolean;
  handleCancel: () => void;
  handleSave: (htmlContent: string) => void;
}) => {
  const { t } = useTranslation();
  const [initialText, setInitialText] = useState(text);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Details.configure({
        persist: false,
        HTMLAttributes: {
          class: "details",
        },
      }),
      DetailsSummary,
      DetailsContent,
      Placeholder.configure({
        includeChildren: true,
        placeholder: ({ node }) => {
          if (node.type.name === "detailsSummary") {
            return "Введите текст";
          }

          return "";
        },
      }),
      Underline,
      Highlight.configure({ multicolor: true }),
      Color,
      Dropcursor,
      TextStyle,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      Youtube.configure({
        nocookie: true,
        interfaceLanguage: "en",
        loop: false,
      }),
      Image.configure({
        allowBase64: true,
        inline: true,
      }),
      ImageResize,
    ],
    editorProps: {
      attributes: {
        class: cn(
          "px-4 py-2 rounded-md focus:outline-none prose max-w-none [&_ol]:list-decimal [&_ul]:list-disc"
        ),
      },
    },
    content: text,
    editable: editable,
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(text);
    }
  }, [text, editor]);

  useEffect(() => {
    if (editor) {
      editor.setOptions({ editable: editable });
      editor.setOptions({
        editorProps: {
          attributes: {
            class: cn(
              `px-4 py-2 rounded-md focus:outline-none ${editable ? "border border-white-dirty max-h-[700px] overflow-scroll" : ""} prose max-w-none [&_ol]:list-decimal [&_ul]:list-disc`
            ),
          },
        },
      });
    }
  }, [editable]);

  if (!editor) return null;

  return (
    <>
      {editable && <Toolbar editor={editor} />}
      <EditorContent editor={editor} />
      {editable && (
        <div className="flex flex-row gap-6 items-center mt-4">
          {/*<Button
            type="button"
            $type="secondary"
            onClick={() => {
              editor.commands.setContent(initialText);
              handleCancel();
            }}
          >
            Отменить
          </Button>*/}
          <Button
            type="button"
            onClick={() => {
              const htmlContent = editor.getHTML();
              setInitialText(htmlContent);
              handleSave(htmlContent);
            }}
          >
            <p>Сохранить</p>
          </Button>
        </div>
      )}
    </>
  );
};
