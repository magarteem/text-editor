"use client";
import { Label, Field, FormState } from "@widgets/index";
import { DatePicker } from "@ui/index";
import { useController } from "react-hook-form";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

export const BirthdayField = ({ reset }: { reset: any }) => {
  const { t } = useTranslation();
  const controller = useController<FormState>({
    name: "birthday",
  });
  const currDate = new Date();

  return (
    <Field>
      <Label>{t("clients.userForm.dateOfBirth")}</Label>
      <DatePicker
        placeholder={t("clients.userForm.dateOfBirth")}
        size={"large"}
        name={controller.field.name}
        minDate={dayjs("01.01.1900", "DD.MM.YYYY")}
        maxDate={dayjs(currDate)}
        value={
          controller.field.value
            ? dayjs(controller.field.value as number)
            : null
        }
        onChange={(date) => {
          if (date) {
            if (date.isAfter("1900-01-01")) {
              const dateNumber = date.unix() * 1000;
              controller.field.onChange(dateNumber);
            }
          } else {
            controller.field.onChange(null);
          }
        }}
        format={"DD.MM.YYYY"}
      />
    </Field>
  );
};
