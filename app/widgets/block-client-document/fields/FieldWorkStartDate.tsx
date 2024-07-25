"use client";
import { Controller } from "react-hook-form";
import { Field, TitleBlock } from "../ui";
import { useTranslation } from "react-i18next";
import { DatePicker, TimePicker } from "@ui/index";
import dayjs from "dayjs";
import { RoleType } from "@/app/shared";

interface FieldWorkStartDate {
  form: any;
  role: RoleType;
}

export function FieldWorkStartDate({ form, role }: FieldWorkStartDate) {
  const { t } = useTranslation();
  const roleUser = role === "Administrator" || role === "Strategist";

  return (
    <Field>
      <TitleBlock title={t("storage.formText.titleFormDate")}>
        <div className="flex flex-row gap-1 items-centers">
          <Controller
            name="startDate"
            control={form.control}
            render={({ field }) => {
              return (
                <DatePicker
                  {...field}
                  disabled={!roleUser}
                  className="max-w-32 text-sm borderedSelect"
                  placeholder={t("storage.formText.placeholderDate")}
                  format={"DD.MM.YYYY"}
                  name={field.name}
                  value={field.value ? dayjs(field.value) : null}
                  minDate={dayjs("01.01.1900", "DD.MM.YYYY")}
                  onChange={(date) => {
                    if (date) {
                      const dateNumber = date.unix() * 1000;
                      field.onChange(dateNumber);
                    } else {
                      field.onChange(null);
                    }
                  }}
                />
              );
            }}
          />

          <div className="flex items-center justify-center">
            <span>,</span>
          </div>

          <Controller
            name="startTime"
            control={form.control}
            render={({ field: { onChange, ...field } }) => {
              return (
                <TimePicker
                  disabled={!roleUser}
                  placeholder={t("storage.formText.placeholderTime")}
                  onChange={(e) => {
                    if (e) onChange(e);
                    else onChange(null);
                  }}
                  {...field}
                />
              );
            }}
          />
        </div>
      </TitleBlock>
    </Field>
  );
}
