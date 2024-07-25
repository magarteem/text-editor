"use client";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Avatar } from "antd";
import { Field } from "../ui/Field";
import { useQueryGetCuratorList } from "@/app/shared/hooks/useQueryGetCuratorList";
import { Label } from "../ui/Label";
import { Select } from "@/app/shared/ui";

interface Props {
  form: any;
}

export const FieldCheckingCurator = ({ form }: Props) => {
  const { t } = useTranslation();
  const { data, isLoading } = useQueryGetCuratorList({ role: "Curator" });

  if (!data) return;

  return (
    <Field classNames="max-w-[306px]">
      <Label>{t("storage.formText.curatorDoc")}</Label>
      <Controller
        name="checkingCuratorId"
        control={form.control}
        render={({ field }) => (
          <Select
            placeholder={t("storage.formText.titleFormDocNotSelected")}
            style={{ height: "40px" }}
            optionRender={(item) => (
              <div className="flex flex-row gap-2 items-center">
                <Avatar size={24} src={item.data.imageUrl} />
                <p>{item.label}</p>
              </div>
            )}
            labelRender={(item) => {
              const currentCurator = data?.find(
                (cur: { value: number; label: string }) =>
                  cur.label === item.label
              );
              return (
                <div className="flex flex-row gap-2 items-center">
                  <Avatar size={24} src={currentCurator?.imageUrl} />
                  <p>{item.label}</p>
                </div>
              );
            }}
            loading={isLoading}
            options={data}
            disabled={isLoading}
            optionFilterProp="label"
            {...field}
          />
        )}
      />
    </Field>
  );
};
