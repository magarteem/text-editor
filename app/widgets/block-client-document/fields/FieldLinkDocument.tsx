import { ErrorMessage } from "@hookform/error-message";
import { Input } from "@ui/index";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface Props {
  form: any;
}

export const FieldLinkDocument = ({ form }: Props) => {
  const { t } = useTranslation();

  return (
    <Controller
      name="docLink"
      control={form.control}
      render={({ field }) => (
        <div className="flex flex-col gap-2 mb-1 w-full relative">
          <Input
            placeholder={t("storage.formText.placeholderLinkDoc")}
            size={"large"}
            isNoValid={true}
            {...field}
          />
          <ErrorMessage
            errors={form.formState.errors}
            name={"docLink"}
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
