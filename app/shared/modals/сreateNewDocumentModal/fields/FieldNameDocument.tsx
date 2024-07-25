import { ErrorMessage } from "@hookform/error-message";
import { Input } from "@ui/index";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface Props {
  form: any;
}

export const FieldNameDocument = ({ form }: Props) => {
  const { t } = useTranslation();

  return (
    <Controller
      name="docName"
      control={form.control}
      render={({ field: { onChange, value, ...field } }) => (
        <div className="flex flex-col gap-2 w-full relative">
          <Input
            isNoValid={true}
            placeholder={t("storage.formText.placeholderNameDoc")}
            size={"large"}
            isAtAllow={true}
            value={value}
            onChange={onChange}
            {...field}
          />
          <ErrorMessage
            errors={form.formState.errors}
            name={"docName"}
            render={(error) => (
              <p className="text-xs text-red-saturated absolute -bottom-4">
                {t(error.message)}
              </p>
            )}
          />
        </div>
      )}
    />
  );
};
