import { Controller } from "react-hook-form";
import { Field } from "@/app/widgets";
import { Input } from "@ui/index";
import { useTranslation } from "react-i18next";
import { ErrorMessage } from "@hookform/error-message";

interface FieldConfirmPassProps {
  form: any;
}

export function FieldNameDirectory({ form }: FieldConfirmPassProps) {
  const { t } = useTranslation();

  return (
    <Field>
      <div className="flex flex-col gap-2 mb-1 relative">
        <Controller
          control={form.control}
          name={"docName"}
          render={({ field: { onChange, ...field } }) => (
            <Input
              placeholder={t("storage.formText.placeholderCatalogName")}
              size={"large"}
              isAtAllow={true}
              name={field.name}
              onChange={onChange}
            />
          )}
        />
        <ErrorMessage
          errors={form.formState.errors}
          name={"docName"}
          render={(error) => (
            <p className="text-xs text-red-saturated absolute -bottom-4">
              {error.message}
            </p>
          )}
        ></ErrorMessage>
      </div>
    </Field>
  );
}
