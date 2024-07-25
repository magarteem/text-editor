import { Select } from "@/app/shared/ui/antd/select/index";
import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useGetCuratorsList } from "@hooks/useGetCuratorasList";
import { Avatar } from "antd";
import { Field, Label } from "@/app/widgets";

export function FieldCurator({
  form,
  curatorList,
}: {
  form: any;
  curatorList: any;
}) {
  const { t } = useTranslation();

  return (
    <Field>
      <Label>{t("clients.filters.curator")}</Label>
      <Controller
        name="curatorId"
        {...form.register}
        render={({ field }) => (
          <Select
            value={field.value}
            onChange={field.onChange}
            size="large"
            className="borderedSelect"
            placeholder={t("clients.filters.curator")}
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
              const currentCurator = curatorList.dataSource.find(
                (cur: { value: number; label: string }) =>
                  cur.label === item.label
              ) as any;
              return (
                <div className="flex flex-row gap-2 items-center">
                  <Avatar size={24} src={currentCurator?.imageUrl} />
                  <p>{item.label}</p>
                </div>
              );
            }}
            loading={curatorList.loading}
            options={curatorList.dataSource}
            disabled={curatorList.loading}
            optionFilterProp="label"
          />
        )}
      />
    </Field>
  );
}
