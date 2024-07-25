import { Select } from "@/app/shared/ui/antd/select/index";
import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Avatar } from "antd";
import { Field, Label } from "@/app/widgets";

export function FieldStrategist({
  form,
  strategistList,
}: {
  form: any;
  strategistList: any;
}) {
  const { t } = useTranslation();

  return (
    <Field>
      <Label>{t("qa.filters.responsibleStrategist")}</Label>
      <Controller
        name="strategistId"
        {...form.register}
        render={({ field }) => (
          <Select
            value={field.value}
            onChange={field.onChange}
            size="large"
            className="borderedSelect"
            placeholder={t("qa.filters.responsibleStrategist")}
            optionRender={(item) => (
              <div
                className="flex flex-row gap-2 items-center"
                onClick={() => field.onChange(item.value)}
              >
                <Avatar size={24} src={item.data.imageUrl} />
                <p>{item.label}</p>
              </div>
            )}
            labelRender={(item) => {
              const currentStrategistId = strategistList.data.find(
                (cur: { value: number; label: string }) =>
                  cur.label === item.label
              ) as any;
              return (
                <div className="flex flex-row gap-2 items-center">
                  <Avatar size={24} src={currentStrategistId?.imageUrl} />
                  <p>{item.label}</p>
                </div>
              );
            }}
            loading={strategistList.isLoading}
            options={strategistList.data}
            disabled={strategistList.loading}
            optionFilterProp="label"
          />
        )}
      />
    </Field>
  );
}
