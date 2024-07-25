"use client";
import { Field } from "@widgets/index";
import { useController, Controller } from "react-hook-form";
import { SelectCustom } from "@ui/index";
import { InputNumber } from "@ui/index";
import { Label } from "@widgets/index";
import { useTranslation } from "react-i18next";
import { ErrorMessage } from "@hookform/error-message";

interface FiledStageProps {
  form: any;
}

export function FiledStage({ form }: FiledStageProps) {
  const { t } = useTranslation();
  const { watch, formState } = form;

  const labels: Record<string, string> = {
    InProgress: t("clients.filters.statuses.InProgress"),
    NotStarted: t("clients.filters.statuses.NotStarted"),
    Completed: t("clients.filters.statuses.Completed"),
    Skipped: t("clients.filters.statuses.Skipped"),
  };

  const options = Object.entries(labels).map(([key, label]) => ({
    label,
    value: key,
  }));

  return (
    <Field>
      <Label>{t("clients.filters.status")}</Label>
      <div className="flex flex-row items-center justify-between relative">
        <Controller
          name="certainStageNumber"
          render={(item) => (
            <InputNumber
              min={0}
              max={100}
              onChange={item.field.onChange}
              formatter={(value) =>
                `${value == undefined || value == null ? "" : value}`
              }
              value={item.field.value}
            />
          )}
        />
        <Controller
          name="certainStageStatus"
          rules={{ required: watch("certainStageNumber") ? true : false }}
          render={(item) => (
            <div style={{ width: "128px" }}>
              <SelectCustom
                isCustom={true}
                options={options}
                disabled={
                  watch("certainStageNumber") == undefined ||
                  watch("certainStageNumber") == null ||
                  watch("certainStageNumber") == 0
                }
                placeholder={t("clients.filters.status")}
                value={item.field?.value}
                className={"whitespace-nowrap w-full"}
                onChange={item.field.onChange}
                optionFilterProp="label"
              />
            </div>
          )}
        />
        <ErrorMessage
          errors={formState.errors}
          name={"certainStageStatus"}
          render={() => (
            <p className="text-xs text-red-saturated absolute -bottom-4">
              {t("clients.filters.statusErr")}
            </p>
          )}
        ></ErrorMessage>
      </div>
    </Field>
  );
}
