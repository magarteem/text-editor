import React, { useState } from "react";
import { useController } from "react-hook-form";
import { useTranslation } from "react-i18next";

export function FiledCompleted({ form }: { form: any }) {
  const { t } = useTranslation();

  const { field } = useController({
    name: "completenessMarker",
    control: form.control,
  });

  return (
    <div className="flex flex-row gap-2 text-sm items-center">
      <p>{t("workflow.tasks.form.completed")}</p>
      <label className="flex cursor-pointer select-none items-center">
        <div className="relative">
          <input
            type="checkbox"
            checked={field.value}
            onChange={field.onChange}
            className="sr-only"
          />
          <div
            className={`block h-8 w-14 rounded-full ${field.value ? "bg-blue-highlight" : "bg-white-platinum"}`}
          ></div>
          <div
            className={`absolute ${!field.value ? "left-1" : "right-1"} top-1 h-6 w-6 rounded-full transition bg-white shadow-sm`}
          ></div>
        </div>
      </label>
    </div>
  );
}
