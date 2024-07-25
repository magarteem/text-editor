import React from "react";
import { Label } from "@/app/widgets/block-user";
import { DatePicker } from "@ui/index";
import { useTranslation } from "react-i18next";
import { useController } from "react-hook-form";
import dayjs from "dayjs";

export function FieldDeadline({ form }: { form: any }) {
  const { t } = useTranslation();

  const {
    field,
    fieldState: { error },
  } = useController({
    name: "deadline",
    control: form.control,
    rules: {
      required: t("workflow.tasks.form.deadlineRequired"),
      validate: (value) =>
        value !== 0 || t("workflow.tasks.form.deadlineRequired"),
    },
  });

  const disablePastDates = (current: any) => {
    return current && current < dayjs().startOf("day");
  };

  return (
    <div className="flex flex-col gap-2">
      <Label>{t("workflow.tasks.form.deadline")}</Label>
      <DatePicker
        value={field.value ? dayjs(field.value as number) : null}
        format={"DD.MM.YYYY"}
        placeholder=""
        disabledDate={disablePastDates}
        onChange={(date) => {
          if (date) {
            const dateNumber = date.unix() * 1000;
            field.onChange(dateNumber);
          } else {
            field.onChange(null);
          }
        }}
      />
      {error && <p className="text-red text-xs">{error.message}</p>}
    </div>
  );
}
