import { useForm } from "react-hook-form";
import { FieldStatusDocument } from "./fields/FieldStatusDocument";
import { FieldVisibleDocument } from "./fields/FieldVisibleDocument";
import { FieldTypeDocument } from "./fields/FieldTypeDocument";
import { FieldOtherParamsDocument } from "./fields/FieldOtherParamsDocument";
import { FieldNameDocument } from "./fields/FieldNameDocument";
import { FieldTextArea } from "./fields/FieldTextArea";
import { FieldCheckPriorityDocument } from "./fields/FieldCheckPriorityDocument";
import { FieldCheckingStrategist } from "./fields/FieldCheckingStrategist";
import { useTranslation } from "react-i18next";
import { Button } from "@/app/shared/ui/button/Button";
import { FieldWorkStartDate } from "./fields/FieldWorkStartDate";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResponseDocFileData } from "./types/type";
import { FieldQaDocument } from "./fields/FieldQaDocument";
import { getHours, getMinutes, setHours, setMinutes } from "date-fns";
import { FieldCheckingCurator } from "./fields/FieldCheckingCurator";
import { useQueryStorageMethods } from "@/app/shared/hooks/useQueryStorageMethods";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { RoleType } from "@/app/shared";
import { FieldLinkDocument } from "./fields/FieldLinkDocument";
import dayjs from "dayjs";

interface PropsForm {
  defaultData: ResponseDocFileData;
  handleEdit: () => void;
  filesId: string;
  role: RoleType;
}

export const FormEditDocument = ({
  defaultData,
  handleEdit,
  filesId,
  role,
}: PropsForm) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState<string>("");
  const { updateFileData } = useQueryStorageMethods();
  const {
    originalName,
    description,
    status,
    visible,
    typeOfDocument,
    associatedWithTOPUniversity,
    reviewPriority,
    approvedByStrategist,
    created,
    startDate,
    link,
    checkingCurator,
    checkingStrategist,
  } = defaultData;

  const editDocument = z.object({
    originalName: z
      .string()
      .min(1, "storage.formText.emptyErr")
      .max(32, "storage.formText.maxCharacters"),
    description: z
      .string()
      .max(2000, "storage.formText.limitCharacters")
      .optional()
      .nullable(),
    status: z.string(),
    visible: z.boolean(),
    typeOfDocument: z.any(),
    approvedByStrategist: z.boolean().optional(),
    associatedWithTOPUniversity: z.boolean().optional(),
    checkingCuratorId: z.number().optional(),
    checkingStrategistId: z.number().optional(),
    reviewPriority: z.string(),
    createdDate: z.number(),
    startDate: z.any().optional(),
    startTime: z.any().optional(),
    createdTime: z.any().optional(),
    docLink: link
      ? z
          .string({ required_error: "storage.formText.emptyErr" })
          .url("storage.formText.noValidURL")
      : z.string().optional(),
  });
  type EditValidationSchema = z.infer<typeof editDocument>;

  const lastIndex = originalName.lastIndexOf(".");
  const prefixFormat =
    !link && lastIndex > 1 ? originalName.substring(lastIndex) : "";

  const { t } = useTranslation();
  const form = useForm<EditValidationSchema>({
    defaultValues: {
      originalName: !link ? originalName.slice(0, lastIndex) : originalName,
      description,
      status,
      visible,
      reviewPriority,
      createdDate: created,
      startDate,
      startTime: startDate ? dayjs(startDate) : undefined,
      typeOfDocument,
      associatedWithTOPUniversity,
      approvedByStrategist,
      checkingCuratorId: checkingCurator?.id,
      checkingStrategistId: checkingStrategist?.id,
      docLink: link ?? undefined,
    },
    resolver: zodResolver(editDocument),
  });

  const onSubmit = async (data: EditValidationSchema) => {
    const date1 = new Date(data.startDate);
    const date2 = data.startTime ? new Date(data.startTime) : new Date();
    const hours = getHours(date2);
    const minutes = getMinutes(date2);
    const combinedDate = data.startDate
      ? setMinutes(setHours(date1, hours), minutes).getTime()
      : null;

    const fileDate = {
      visible: data.visible,
      startDate: combinedDate,
      description: !!data.description ? data.description : null,
      status: data.status,
      typeOfDocument: data.typeOfDocument,
      fileId: +filesId,
      originalName: data.originalName + prefixFormat,
      associatedWithTOPUniversity: data.associatedWithTOPUniversity,
      approvedByStrategist: data.approvedByStrategist,
      checkingCuratorId: data.checkingCuratorId,
      checkingStrategistId: data.checkingStrategistId,
      reviewPriority: data.reviewPriority,
      link: data.docLink,
    };

    setIsLoading(true);
    updateFileData.mutate(fileDate, {
      onSuccess() {
        handleEdit();
        setIsLoading(false);
        setError("");
      },
      onError(err) {
        setIsLoading(false);
        const ERROR = err as AxiosError;
        ERROR.response && setError(ERROR.response.statusText);
      },
    });
  };

  useEffect(() => {
    !!isError && setError("");
  }, [form.formState.isDirty]);

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-4  px-0"
    >
      <div className="flex flex-col gap-4 w-full px-6 text-sm text-black-not-so">
        <div className="flex gap-4  w-full">
          <FieldNameDocument form={form} prefixFormat={prefixFormat} />
          {link && <FieldLinkDocument form={form} />}
        </div>
        <div>
          <FieldTextArea form={form} />
        </div>

        <div className="grid grid-cols-2  gap-4">
          <FieldStatusDocument form={form} linkFile={!!link} />
          <FieldVisibleDocument form={form} />
          <FieldTypeDocument form={form} />
          <FieldOtherParamsDocument form={form} />
          <FieldCheckingCurator form={form} role={role} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 px-6  border-t-2 border-b-2 py-4 border-[#EAF0F5]">
        <FieldCheckPriorityDocument form={form} />
        <FieldWorkStartDate form={form} role={role} />
        <FieldCheckingStrategist form={form} />
        <FieldQaDocument form={form} role={role} />
      </div>

      <div className="grid grid-cols-2 gap-4 px-6  border-[#EAF0F5]">
        <div className={"flex items-center gap-4 mt-4"}>
          <Button type={"button"} $type={"secondary"} onClick={handleEdit}>
            {t("button.cancel")}
          </Button>
          <Button
            type={"submit"}
            disabled={(!!isError && isLoading) || !form.formState.isDirty}
          >
            <p
              className={
                !form.formState.isDirty || isLoading ? "text-gray" : ""
              }
            >
              {!!!isError && isLoading ? t("button.saving") : t("button.save")}
            </p>
          </Button>
        </div>
      </div>
    </form>
  );
};
