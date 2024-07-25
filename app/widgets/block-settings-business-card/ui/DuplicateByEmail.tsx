import { Field } from "@/app/widgets";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  notificationToEmail?: boolean;
  toggleUpdate: (checked: boolean) => void;
}

export function DuplicateByEmail({
  notificationToEmail = false,
  toggleUpdate,
}: Props) {
  const { t } = useTranslation();
  const [checked, setChecked] = useState(notificationToEmail);

  return (
    <Field>
      <div className="flex items-center gap-4 mb-1 relative">
        <p className="text-gray text-sm">
          {t("settings.notifications.checkBoxEmail")}
        </p>

        <label className="flex cursor-pointer select-none items-center">
          <div className="relative">
            <input
              onChange={(e) => {
                toggleUpdate(!checked);
                setChecked((prev) => !prev);
              }}
              type="checkbox"
              checked={checked}
              className="sr-only"
            />
            <div
              className={`block h-6 w-11 rounded-full ${checked ? "bg-blue-highlight" : "bg-white-platinum"}`}
            ></div>

            <div
              className={`absolute ${!checked ? "left-1" : "right-1"} top-1 h-4 w-4 rounded-full transition bg-white shadow-sm`}
            ></div>
          </div>
        </label>
      </div>
    </Field>
  );
}
