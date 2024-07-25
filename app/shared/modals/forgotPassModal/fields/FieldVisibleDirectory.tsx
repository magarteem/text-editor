import { Controller } from "react-hook-form";
import { Field, Label } from "@/app/widgets";
import { useTranslation } from "react-i18next";

interface FieldConfirmPassProps {
  form: any;
}

export function FieldVisibleDirectory({ form }: FieldConfirmPassProps) {
  const { t } = useTranslation();

  return (
    <Field>
      <div className="flex flex-col gap-4 mb-1 relative">
        <Label>{t("storage.formText.titleFormVisible")}</Label>
        <Controller
          control={form.control}
          name={"visible"}
          render={({ field }) => (
            <label className="flex cursor-pointer select-none items-center">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={field.onChange}
                  className="sr-only"
                />
                <div
                  className={`block h-6 w-11 rounded-full ${field.value ? "bg-blue-highlight" : "bg-white-platinum"}`}
                ></div>

                <div
                  className={`absolute ${!field.value ? "left-1" : "right-1"} top-1 h-4 w-4 rounded-full transition bg-white shadow-sm`}
                ></div>
              </div>
            </label>
          )}
        />
      </div>
    </Field>
  );
}
