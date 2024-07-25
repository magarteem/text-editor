import { Controller } from "react-hook-form";
import { Field, Label } from "@/app/widgets";
import { useTranslation } from "react-i18next";

interface FieldConfirmPassProps {
  form: any;
  changeTopFilter: (obj: { page: number; onlyRead?: boolean }) => void;
}

export function FieldOnlyReady({
  form,
  changeTopFilter,
}: FieldConfirmPassProps) {
  const { t } = useTranslation();

  return (
    <Field>
      <div className="flex items-center gap-4 mb-1 relative">
        <p className="text-gray text-sm">
          {t("notification.header.onlyUnread")}
        </p>
        <Controller
          control={form.control}
          name={"onlyRead"}
          render={({ field }) => (
            <label className="flex cursor-pointer select-none items-center">
              <div className="relative">
                <input
                  onChange={(e) => {
                    const temp: { [key: string]: boolean | undefined } = {};
                    field.onChange(e.target.checked);
                    temp["onlyRead"] = e.target.checked ? false : undefined;
                    changeTopFilter({ page: 1, ...temp });
                  }}
                  type="checkbox"
                  checked={field.value}
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
