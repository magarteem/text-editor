import React, { useState, useCallback } from "react";
import {
  useForm,
  useFieldArray,
  UseFormReturn,
  FieldArrayWithId,
} from "react-hook-form";
import { Divider } from "antd";
import { Button, Input } from "@ui/index";
import { useTranslation } from "react-i18next";
import { Role } from "@/app/shared/hooks/useGetFiles";
import DocumentIcon from "@/public/svg/dock-icon.svg";
import InnerDownloadIcon from "@/public/svg/InnerDownloadIcon.svg";
import SaveIcon from "@/public/svg/check.svg";
import TrashIcon from "@/public/svg/trash-icon.svg";
import { useUploadFiles } from "./hooks/useUploadFiles";
import { useUploadLinksFiles } from "./hooks/useUploadLinksFiles";
import { useRemoveFile } from "./hooks/useRemoveFile";

interface UploadFormProps {
  stageId: number;
  role: Role;
  filesList: FileField[] | any;
  linksList: LinkField[];
  refetch: () => void;
  onCancel: () => void;
  onSuccess: () => void;
}

interface FileField {
  id?: number;
  originalName: string;
  file: File;
}

interface LinkField {
  id?: number;
  originalName: string;
  link: string;
}

interface FormData {
  files: FileField[];
  links: LinkField[];
}

export const UploadForm: React.FC<UploadFormProps> = ({
  stageId,
  role,
  filesList,
  linksList,
  onCancel,
  onSuccess,
  refetch,
}) => {
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      links: linksList,
      files: filesList,
    },
  });

  const {
    fields: linkFields,
    append: appendLink,
    remove: removeLink,
  } = useFieldArray({ control, name: "links", keyName: "LinkId" });
  const {
    fields: fileFields,
    append: appendFile,
    remove: removeFile,
  } = useFieldArray({ control, name: "files", keyName: "FileId" });

  const [newLinkName, setNewLinkName] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("");

  const { uploadLinks, loadingLinks: isUploadingLinks } = useUploadLinksFiles(
    role,
    stageId
  );
  const { uploadFiles, loadingFiles: isUploadingFiles } = useUploadFiles(
    role,
    stageId
  );
  const { removeFile: removeFileFromServer } = useRemoveFile(role, stageId);

  const handleAppendLink = useCallback(() => {
    if (newLinkName && newLinkUrl) {
      appendLink({ originalName: newLinkName, link: newLinkUrl });
      setNewLinkName("");
      setNewLinkUrl("");
    }
  }, [newLinkName, newLinkUrl, appendLink]);

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        Array.from(e.target.files).forEach((file) => {
          appendFile({ originalName: file.name, file });
        });
      }
    },
    [appendFile]
  );

  const handleRemove = (index: number, type: "link" | "file") => {
    const item = type === "link" ? linkFields[index] : fileFields[index];
    if (item.id) {
      removeFileFromServer(item.id);
    }
    type === "link" ? removeLink(index) : removeFile(index);
    refetch();
  };

  const onSubmit = async (data: FormData) => {
    const newFiles = data.files.filter((file) => !file.id);
    const newLinks = data.links.filter((link) => !link.id);

    if (newFiles.length > 0) await uploadFiles({ files: newFiles as any });
    if (newLinks.length > 0) await uploadLinks({ links: newLinks });

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FileUploadSection
        fileFields={fileFields}
        handleFileUpload={handleFileUpload}
        handleRemove={handleRemove}
        t={t}
      />
      <Divider />
      <LinkUploadSection
        linkFields={linkFields}
        newLinkName={newLinkName}
        newLinkUrl={newLinkUrl}
        setNewLinkName={setNewLinkName}
        setNewLinkUrl={setNewLinkUrl}
        handleAppendLink={handleAppendLink}
        handleRemove={handleRemove}
        t={t}
      />
      <FormActions
        onCancel={onCancel}
        isDisabled={
          (linkFields.length === 0 && fileFields.length === 0) ||
          isUploadingLinks.current ||
          isUploadingFiles
        }
        t={t}
      />
    </form>
  );
};

interface FileUploadSectionProps {
  fileFields: FieldArrayWithId<FormData, "files", "id">[] | any;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemove: (index: number, type: "file") => void;
  t: any;
}

const FileUploadSection: React.FC<FileUploadSectionProps> = ({
  fileFields,
  handleFileUpload,
  handleRemove,
  t,
}) => (
  <div>
    <header className="flex flex-row items-center gap-1 text-sm text-gray">
      <DocumentIcon />
      <h3>{t("workflow.materials.files")}</h3>
    </header>
    <div className="file-upload-container">
      <input
        type="file"
        onChange={handleFileUpload}
        className="file-input"
        style={{ display: "none" }}
        multiple
      />
      <button
        type="button"
        onClick={() =>
          document.querySelector<HTMLInputElement>(".file-input")?.click()
        }
        className="mt-3 h-14 bg-blue-bright rounded-xl w-full border-white-dirty border-dashed border"
      >
        <div className="text-nowrap flex flex-row px-3 text-sm">
          <span className="text-gray">
            {t("workflow.materials.dragAndDropText")}
          </span>
          &nbsp;
          <p className="text-blue-highlight">
            {t("workflow.materials.uploadText")}
          </p>
        </div>
      </button>
    </div>
    <FileList fileFields={fileFields} handleRemove={handleRemove} />
  </div>
);

interface FileListProps {
  fileFields: FieldArrayWithId<FormData, "files", "id">[];
  handleRemove: (index: number, type: "file") => void;
}

const FileList: React.FC<FileListProps> = ({ fileFields, handleRemove }) => (
  <ul className="mt-3 text-blue-highlight gap-2 text-sm flex flex-col">
    {fileFields.map((file, index) => (
      <li
        key={file.id}
        className="flex flex-row gap-2 justify-between items-center relative"
      >
        <p className="absolute left-0">{index + 1}</p>
        <p className="ml-5">{file.originalName}</p>
        <button type="button" onClick={() => handleRemove(index, "file")}>
          <TrashIcon />
        </button>
      </li>
    ))}
  </ul>
);

interface LinkUploadSectionProps {
  linkFields: FieldArrayWithId<FormData, "links", "id">[] | any;
  newLinkName: string;
  newLinkUrl: string;
  setNewLinkName: React.Dispatch<React.SetStateAction<string>>;
  setNewLinkUrl: React.Dispatch<React.SetStateAction<string>>;
  handleAppendLink: () => void;
  handleRemove: (index: number, type: "link") => void;
  t: any;
}

const LinkUploadSection: React.FC<LinkUploadSectionProps> = ({
  linkFields,
  newLinkName,
  newLinkUrl,
  setNewLinkName,
  setNewLinkUrl,
  handleAppendLink,
  handleRemove,
  t,
}) => (
  <div>
    <header className="flex flex-row items-center gap-1 text-sm text-gray">
      <InnerDownloadIcon />
      <h3>{t("workflow.materials.links")}</h3>
    </header>
    <div className="mt-3 flex flex-row gap-2">
      <Input
        placeholder={t("workflow.materials.namePlaceholder")}
        value={newLinkName}
        onChange={(e: any) => setNewLinkName(e.target.value)}
      />
      <Input
        isNoValid={true}
        placeholder={t("workflow.materials.linkPlaceholder")}
        onChange={(e: any) => setNewLinkUrl(e.target.value)}
        value={newLinkUrl}
      />
      <button type="button" onClick={handleAppendLink}>
        <SaveIcon />
      </button>
    </div>
    <LinkList linkFields={linkFields} handleRemove={handleRemove} />
  </div>
);

interface LinkListProps {
  linkFields: FieldArrayWithId<FormData, "links", "id">[];
  handleRemove: (index: number, type: "link") => void;
}

const LinkList: React.FC<LinkListProps> = ({ linkFields, handleRemove }) => (
  <ul className="mt-3 gap-2 text-sm flex flex-col">
    {linkFields.map((link, index) => (
      <li
        key={link.id}
        className="flex justify-between items-center font-normal text-blue-highlight overflow-hidden text-ellipsis"
      >
        <div className="flex gap-2 justify-center items-center">
          <span>{index + 1}</span>
          <span className="max-w-60 overflow-hidden text-ellipsis">
            {link.originalName}
          </span>
        </div>
        <button type="button" onClick={() => handleRemove(index, "link")}>
          <TrashIcon />
        </button>
      </li>
    ))}
  </ul>
);

interface FormActionsProps {
  onCancel: () => void;
  isDisabled: boolean;
  t: any;
}

const FormActions: React.FC<FormActionsProps> = ({
  onCancel,
  isDisabled,
  t,
}) => (
  <div className="flex items-center gap-4 mt-4">
    <Button type="button" $type="secondary" onClick={onCancel}>
      {t("button.cancel")}
    </Button>
    <Button type="submit" disabled={isDisabled}>
      {t("button.save")}
    </Button>
  </div>
);
