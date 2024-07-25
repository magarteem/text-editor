import { useState, useCallback, useRef } from "react";
import type { Editor } from "@tiptap/react";
import {
  ItalicOutlined,
  BoldOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  UnorderedListOutlined,
  OrderedListOutlined,
  UndoOutlined,
  RedoOutlined,
  BorderVerticleOutlined,
  LinkOutlined,
  BgColorsOutlined,
  FontColorsOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
  DeleteOutlined,
  YoutubeOutlined,
  FileImageOutlined,
  UploadOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";
import { SelectCustom } from "@ui/index";
import type { ReactElement } from "react";
import { Level } from "@tiptap/extension-heading";
import QuoteIcon from "@/public/svg/quote-icon.svg";
import { useUploadImage } from "@hooks/useUploadImage";

const MenuItem = ({
  icon,
  onClick,
  isActive = false,
  disabled,
}: {
  icon: ReactElement;
  isActive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) => {
  return (
    <button
      className={`${isActive ? "bg-white-dirty" : ""} p-2 rounded-md hover:bg-[#E7F5FF] aspect-square disabled:bg-white`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
    </button>
  );
};

const MenuFillTextColor = ({ editor }: { editor: Editor }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleButtonClick = () => {
    setShowColorPicker(!showColorPicker);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    editor.chain().focus().toggleHighlight({ color: e.target.value }).run();
  };

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={handleButtonClick}
        className={`${editor.isActive("highlight") ? "bg-white-dirty" : ""} rounded-md hover:bg-[#E7F5FF] flex items-center p-3`}
      >
        <BgColorsOutlined />
      </button>
      {showColorPicker && (
        <input
          type="color"
          onInput={handleColorChange}
          value={editor.getAttributes("highlight").color || "#000000"}
          data-testid="setColor"
          className="h-5 w-6 bg-inherit"
        />
      )}
    </div>
  );
};

const MenuTextColor = ({ editor }: { editor: Editor }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleButtonClick = () => {
    setShowColorPicker(!showColorPicker);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    editor.chain().focus().setColor(e.target.value).run();
  };

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={handleButtonClick}
        className={`${editor.isActive("textStyle") ? "bg-white-dirty" : ""} rounded-md hover:bg-[#E7F5FF] flex items-center p-3`}
      >
        <FontColorsOutlined />
      </button>
      {showColorPicker && (
        <input
          type="color"
          onInput={handleColorChange}
          value={editor.getAttributes("textStyle").color || "#000000"}
          data-testid="setColor"
          className="h-5 w-6 bg-inherit"
        />
      )}
    </div>
  );
};

const MenuHeadingAndList = ({ editor }: { editor: Editor }) => {
  const labels: Record<string, ReactElement> = {
    undefined: (
      <div className="flex items-center w-full">
        <h3 className="font-semibold">Txt</h3>
        <p className="text-sm ml-2">Normal</p>
      </div>
    ),
    "1": (
      <div className="flex items-center w-full">
        <h3 className="font-semibold">H1</h3>
        <p className="text-sm ml-2">Heading 1</p>
      </div>
    ),
    "2": (
      <div className="flex items-center w-full">
        <h3 className="font-semibold">H2</h3>
        <p className="text-sm ml-2">Heading 2</p>
      </div>
    ),
    "3": (
      <div className="flex items-center w-full">
        <h3 className="font-semibold">H3</h3>
        <p className="text-sm ml-2">Heading 3</p>
      </div>
    ),
  };

  const options = Object.entries(labels).map(([key, label]) => ({
    label,
    value: String(key),
  }));

  return (
    <SelectCustom
      isCustom
      options={options}
      value={String(editor.getAttributes("heading").level)}
      size="large"
      onChange={(size: string) => {
        const currLevel = editor.getAttributes("heading").level;
        if (size === "undefined") {
          editor.chain().focus().toggleHeading({ level: currLevel }).run();
        } else {
          editor
            .chain()
            .focus()
            .toggleHeading({ level: Number(size) as Level })
            .run();
        }
      }}
      className="whitespace-nowrap w-36"
    />
  );
};

const MenuAlignSelect = ({ editor }: { editor: Editor }) => {
  const labels: Record<string, ReactElement> = {
    left: (
      <div className="flex items-center w-full">
        <AlignLeftOutlined />
        <p className="ml-2">Left Align</p>
      </div>
    ),
    center: (
      <div className="flex items-center w-full">
        <AlignCenterOutlined />
        <p className="ml-2">Center Align</p>
      </div>
    ),
    right: (
      <div className="flex items-center w-full">
        <AlignRightOutlined />
        <p className="ml-2">Right Align</p>
      </div>
    ),
  };

  const options = Object.entries(labels).map(([key, label]) => ({
    label,
    value: key,
  }));

  return (
    <SelectCustom
      isCustom
      options={options}
      value={
        editor.getAttributes("paragraph").textAlign ||
        editor.getAttributes("heading").textAlign ||
        "left"
      }
      size="large"
      onChange={(align: "left" | "center" | "right") =>
        editor.chain().focus().setTextAlign(align).run()
      }
      className="whitespace-nowrap w-36"
    />
  );
};

interface Props {
  editor: Editor | any;
}

export const Toolbar: React.FC<Props> = ({ editor }) => {
  const { uploadImage } = useUploadImage();

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  }, [editor]);

  const addYoutubeVideo = () => {
    const url = prompt("Enter YouTube URL");
    if (url) {
      editor.commands.setYoutubeVideo({ src: url, width: 480, height: 270 });
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && editor) {
      try {
        const result = await uploadImage({ file });
        if (result && result.directUrl) {
          editor
            .chain()
            .focus()
            .insertContent({
              type: "image",
              attrs: { src: "https://" + result.directUrl },
            })
            .run();
        } else {
          console.error(`Failed to upload image: ${file.name}`);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const addImageByUrl = () => {
    const url = prompt("Enter the image URL");
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <div className="flex gap-2">
          <MenuItem
            icon={
              <UndoOutlined
                style={{ color: !editor.can().undo() ? "gray" : "black" }}
              />
            }
            disabled={!editor.can().undo()}
            onClick={() => editor.chain().focus().undo().run()}
          />
          <MenuItem
            icon={
              <RedoOutlined
                style={{ color: !editor.can().redo() ? "gray" : "black" }}
              />
            }
            disabled={!editor.can().redo()}
            onClick={() => editor.chain().focus().redo().run()}
          />
          <MenuHeadingAndList editor={editor} />
        </div>
        <MenuItem
          icon={<BoldOutlined />}
          isActive={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />
        <MenuItem
          icon={<ItalicOutlined />}
          isActive={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />
        <MenuItem
          icon={<UnderlineOutlined />}
          isActive={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        />
        <MenuItem
          icon={<StrikethroughOutlined />}
          isActive={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        />
        <MenuItem
          icon={<LinkOutlined />}
          isActive={editor.isActive("link")}
          onClick={setLink}
        />
        <MenuFillTextColor editor={editor} />
        <MenuTextColor editor={editor} />
        <MenuItem
          icon={<QuoteIcon />}
          isActive={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        />
        <MenuItem
          icon={<BorderVerticleOutlined />}
          isActive={editor.isActive("horizontalRule")}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        />
        <MenuItem
          icon={<DeleteOutlined />}
          onClick={() =>
            editor.chain().focus().clearNodes().unsetAllMarks().run()
          }
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <MenuItem
          icon={<OrderedListOutlined />}
          isActive={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        />
        <MenuItem
          icon={<UnorderedListOutlined />}
          isActive={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />
        <MenuAlignSelect editor={editor} />
        <MenuItem icon={<YoutubeOutlined />} onClick={addYoutubeVideo} />
        <MenuItem icon={<FileImageOutlined />} onClick={addImageByUrl} />
        <MenuItem icon={<UploadOutlined />} onClick={triggerFileInput} />
        <MenuItem
          icon={<CaretRightOutlined />}
          onClick={() => editor.chain().focus().setDetails().run()}
        />
      </div>
    </div>
  );
};
