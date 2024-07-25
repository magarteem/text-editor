import { Button } from "../../ui";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useModal } from "../modal/ModalProvider";
import { useParams } from "next/navigation";
import AddSquare from "@/public/svg/add-square.svg";
import { FieldStatusDocument } from "./fields/FieldStatusDocument";
import {
  FieldLinkDocument,
  FieldNameDocument,
  FieldOtherParamsDocument,
  FieldTextArea,
  FieldTypeDocument,
  FieldVisibleDocument,
} from "./fields";
import { z } from "zod";
import { useQueryStorageMethods } from "../../hooks/useQueryStorageMethods";
import { FieldCheckingCurator } from "./fields/FieldCheckingCurator";
import { zodResolver } from "@hookform/resolvers/zod";
import { RoleType } from "../../api";
import { useState } from "react";

interface Props {
  parentId: number;
  role: RoleType;
}

const createDocument = z.object({
  docName: z
    .string({ required_error: "storage.formText.emptyErr" })
    .trim()
    .min(1, "storage.formText.emptyErr")
    .max(32, "storage.formText.maxCharacters"),
  docLink: z
    .string({ required_error: "storage.formText.emptyErr" })
    .url("storage.formText.noValidURL"),
  docDescription: z
    .string()
    .trim()
    .max(2000, "storage.formText.limitCharacters")
    .optional(),
  docStatus: z.string().optional(),
  docType: z.any().optional(),
  docVisible: z.boolean().optional(),
  checkingCuratorId: z.number().optional(),
  docOther: z.boolean().optional(),
});
type ValidationSchema = z.infer<typeof createDocument>;

export function CreateNewDocumentModalAsLink({ data }: { data: Props }) {
  const { t } = useTranslation();
  const { closeModal } = useModal();
  const { userId }: { userId: string } = useParams();
  const [pendingUpload, setPendingUpload] = useState(false);

  const form = useForm<ValidationSchema>({
    defaultValues: {
      docName: "",
      docLink: "",
      docDescription: "",
      docStatus: undefined,
      docType: undefined,
      docVisible: false,
      checkingCuratorId: undefined,
      docOther: false,
    },
    resolver: zodResolver(createDocument),
  });

  const { createNewDocFileAsLink } = useQueryStorageMethods();

  const onSubmit = async (dataForm: ValidationSchema) => {
    setPendingUpload(true);

    const docFile = {
      ownerId: +userId,
      parentId: data.parentId ?? null,
      originalName: dataForm.docName,
      link: dataForm.docLink,
      associatedWithTOPUniversity: dataForm.docOther,
      visible: dataForm.docVisible,
      description: dataForm.docDescription,
      status: dataForm.docStatus,
      checkingCuratorId: dataForm.checkingCuratorId,
      typeOfDocument: dataForm.docType,
    };

    createNewDocFileAsLink.mutate(docFile, {
      onSuccess() {
        closeModal();
      },
      onError() {
        setPendingUpload(false);
      },
    });
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-[628px]"
      >
        <h1 className={"flex items-center gap-2 text-gray text-base font-bold"}>
          <AddSquare />
          {t("storage.formText.titleFormCreateDoc")}
        </h1>

        <div>
          <div className="flex w-full gap-4">
            <FieldNameDocument form={form} />
            <FieldLinkDocument form={form} />
          </div>
          <span className="inline-block text-xs font-normal text-orange-giants bg-yellow-deep-light px-4 leading-6 rounded-lg py-1 mt-4">
            {t("storage.modals.accessToDocument")}
          </span>
        </div>

        <FieldTextArea form={form} />

        <div className="flex w-full gap-4">
          <div className="flex flex-col gap-4  w-full">
            <FieldStatusDocument form={form} linkFile={true} />
            <FieldTypeDocument form={form} />
          </div>

          <div className="flex flex-col gap-4  w-full">
            <FieldVisibleDocument form={form} />
            <FieldOtherParamsDocument form={form} />
          </div>
        </div>

        {(data.role === "Administrator" || data.role === "Strategist") && (
          <FieldCheckingCurator form={form} />
        )}

        <div className="flex gap-4 items-center">
          <Button type={"button"} $type={"secondary"} onClick={closeModal}>
            {t("button.cancel")}
          </Button>
          <Button
            type={"submit"}
            disabled={!form.formState.isDirty || pendingUpload}
          >
            <p
              className={
                !form.formState.isDirty || pendingUpload
                  ? "text-grey-light"
                  : ""
              }
            >
              {t("button.save")}
            </p>
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
