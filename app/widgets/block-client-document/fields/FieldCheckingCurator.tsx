"use client";
import { Label } from "@widgets/index";
import { Select } from "@ui/index";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Field } from "../ui/Field";
import { Avatar } from "antd";
import { useQueryGetCuratorList } from "@/app/shared/hooks/useQueryGetCuratorList";
import { RoleType } from "@/app/shared";

interface Props {
  form: any;
  role: RoleType;
}

export const FieldCheckingCurator = ({ form, role }: Props) => {
  const { t } = useTranslation();
  const { data, isLoading } = useQueryGetCuratorList({ role: "Curator" });

  if (!data) return;

  return (
    <Field classNames="max-w-96">
      <Label>{t("storage.formText.curatorDoc")}</Label>
      <Controller
        name="checkingCuratorId"
        control={form.control}
        rules={{ required: true }}
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
            disabled={
              isLoading || (role !== "Administrator" && role !== "Strategist")
            }
            optionFilterProp="label"
            {...field}
          />
        )}
      />
    </Field>
  );
};
