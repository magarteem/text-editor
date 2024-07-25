import { Button } from "../../ui";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useModal } from "../modal/ModalProvider";
import { useParams } from "next/navigation";
import AddSquare from "@/public/svg/add-square.svg";
import { z } from "zod";
import {
  FieldOtherParamsDocument,
  FieldTextArea,
  FieldTypeDocument,
  FieldUploadDocument,
  FieldVisibleDocument,
} from "./fields";
import { FieldStatusDocument } from "./fields/FieldStatusDocument";
import { FieldCheckingCurator } from "./fields/FieldCheckingCurator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";
import { RoleType, getCookie } from "../../api";
import queryString from "query-string";
import { useQueryClient } from "@tanstack/react-query";
import cn from "classnames";
import { useQueryStorageMethods } from "../../hooks/useQueryStorageMethods";

interface Props {
  parentId: number;
  role: RoleType;
  myUserId?: number;
}

const createDocument = z.object({
  docFile: z.instanceof(File, { message: "storage.formText.fileNotUpload" }),
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
export type ValidationSchema = z.infer<typeof createDocument>;

export function CreateNewDocumentModal({ data }: { data: Props }) {
  const { updateFileData } = useQueryStorageMethods();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { closeModal } = useModal();
  const { userId }: { userId: string } = useParams();
  const [uploading, setUploading] = useState(false);
  const [pendingUpload, setPendingUpload] = useState(false);
  const [progress, setProgress] = useState(0);
  const form = useForm<ValidationSchema>({
    defaultValues: {
      docFile: undefined,
      docDescription: "",
      docStatus: undefined,
      docType: undefined,
      docVisible: data.role === "Client",
      checkingCuratorId: undefined,
      docOther: false,
    },
    resolver: zodResolver(createDocument),
  });

  const onSubmit = async (dataForm: ValidationSchema) => {
    setPendingUpload(true);

    const formData = new FormData();
    dataForm.docFile &&
      formData.append(
        "files",
        dataForm.docFile,
        JSON.stringify(dataForm.docFile.name)
      );

    const fileDate = {
      associatedWithTOPUniversity: dataForm.docOther,
      parentId: data.parentId ?? null,
      visible: dataForm.docVisible ?? true,
      description: dataForm.docDescription,
      status: dataForm.docStatus,
      checkingCuratorId: dataForm.checkingCuratorId,
      typeOfDocument: dataForm.docType,
      ownerId: userId ? +userId : data.myUserId,
      files: formData,
    };

    try {
      setUploading(true);

      const { files, ...dataParams } = fileDate;
      let stringParams = queryString.stringify(
        {
          parentId: data.parentId ?? null,
          visible: dataForm.docVisible ?? true,
          ownerId: userId ? +userId : data.myUserId,
        },
        {}
      );
      await axios
        .post(`/api/storage/file?` + stringParams, files, {
          headers: {
            Authorization: `Bearer ${getCookie("jwt")}`,
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (event: any) => {
            const percent = Math.round((event.loaded * 100) / event.total);
            setProgress(percent);
          },
        })
        .then((res) => {
          const dataPatch = {
            fileId: res.data[0].id,
            originalName: dataForm.docFile.name,
            ...dataParams,
          };

          updateFileData.mutate(dataPatch, {
            onSuccess() {
              closeModal();
              queryClient.invalidateQueries({
                queryKey: ["useQueryGetAllStorageFiles"],
              });
            },
            onError() {
              setPendingUpload(false);
              setUploading(false);
              form.setError("docFile", {
                message: "Error Upload File",
              });
            },
          });
        });
    } catch (error) {
      setPendingUpload(false);
      setUploading(false);
      form.setError("docFile", {
        message: "Error Upload File",
      });
      console.error(error);
    } finally {
      setPendingUpload(false);
      setUploading(false);
      setProgress(0);
    }
  };

  const removeFile = () => setUploading(false);
  const checkIsDirty = form.formState.isDirty || form.watch("docFile")?.size;

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

        <FieldUploadDocument
          form={form}
          progress={progress}
          uploading={uploading}
          removeFile={removeFile}
        />

        {data.role !== "Client" && (
          <>
            <FieldTextArea form={form} />

            <div className="flex w-full gap-4">
              <div className="flex flex-col gap-4  w-full">
                <FieldStatusDocument form={form} />
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
          </>
        )}

        <div
          className={cn("flex gap-4 items-center mt-4", {
            "justify-center": data.role === "Client",
          })}
        >
          <Button type={"button"} $type={"secondary"} onClick={closeModal}>
            {t("button.cancel")}
          </Button>
          <Button type={"submit"} disabled={!checkIsDirty || pendingUpload}>
            <p
              className={
                !checkIsDirty || pendingUpload ? "text-grey-light" : ""
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
