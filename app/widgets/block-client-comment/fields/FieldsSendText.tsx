import { FieldsTextArea } from "@/app/shared/ui/textArea";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ErrorMessage } from "@hookform/error-message";

interface Props {
  form: any;
  isWorkflow?: boolean;
}

export const FieldsSendText = ({ form, isWorkflow = false }: Props) => {
  const { t } = useTranslation();

  return (
    <Controller
      control={form.control}
      name={"text"}
      render={({ field }) => (
        <>
          <FieldsTextArea
            placeholder={
              isWorkflow
                ? t("workflow.comments.placeholderCommit")
                : t("storage.comment.placeholderCommit")
            }
            autoSize={{ minRows: 3, maxRows: 5 }}
            value={field.value}
            onChange={field.onChange}
            name={field.name}
            inputMode="search"
            status={!!form.formState.errors.text ? "error" : ""}
          />
          <ErrorMessage
            errors={form.formState.errors}
            name={"text"}
            render={(error) => (
              <p className="text-xs text-red-saturated absolute -bottom-4">
                {t(error.message)}
              </p>
            )}
          />
        </>
      )}
    />
  );
};
