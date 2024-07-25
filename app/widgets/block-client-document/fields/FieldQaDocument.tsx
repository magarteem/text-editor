import React from "react";
import { Checkbox } from "antd";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Field, Label } from "../ui";
import { RoleType } from "@/app/shared";

interface Props {
  form: any;
  role: RoleType;
}

export function FieldQaDocument({ form, role }: Props) {
  const { t } = useTranslation();
  const roleUser = role === "Administrator" || role === "Strategist";

  return (
    <Field>
      <div className="gap-3">
        <Controller
          name="approvedByStrategist"
          control={form.control}
          render={({ field }) => (
            <Label>
              {t("storage.formText.placeholderQA")}

              <div className="flex items-center gap-3 text-sm font-normal mt-2 ml-2 h-10">
                <Checkbox
                  disabled={!roleUser}
                  checked={field.value}
                  className="text-black-not-so"
                  {...field}
                />
                <p>{t("storage.formText.placeholderApproved")}</p>
              </div>
            </Label>
          )}
        />
      </div>
    </Field>
  );
}
