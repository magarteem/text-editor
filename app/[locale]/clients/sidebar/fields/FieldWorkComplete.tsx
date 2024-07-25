"use client";
import { Field } from "@widgets/index";
import { useController } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Checkbox } from "antd";

export const FieldWorkComplete = () => {
  const { t } = useTranslation();

  const controller = useController<any>({
    name: "allStagesCompleted",
  });

  return (
    <Field>
      <div className="flex flex-row gap-9 items-center">
        <div className="flex flex-row gap-2 text-sm font-normal items-center">
          <Checkbox {...controller.field} checked={controller.field.value} />
          <p className="text-gray font-semibold">
            {t("clients.filters.сompleted")}
          </p>
        </div>
      </div>
    </Field>
  );
};
