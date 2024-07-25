"use client";
import { Field } from "@widgets/index";
import { useController } from "react-hook-form";
import { TitleBlock } from "@/app/widgets/block-application-details/ui";
import { useTranslation } from "react-i18next";
import { InputNumber } from "@ui/index";
import { Checkbox } from "antd";

export const FieldNumberOfUniversities = () => {
  const { t } = useTranslation();

  const controller = useController<any>({
    name: "numberOfUniversities",
  });

  const controllerTop = useController<any>({
    name: "hasTopUniversities",
  });

  return (
    <Field>
      <TitleBlock title={t("widgets.ApplicationDetails.numberOfUniversities")}>
        <div className="flex flex-row gap-9 items-center">
          <InputNumber
            value={controller.field.value}
            min={0}
            max={100}
            onChange={(e) => controller.field.onChange(e)}
            formatter={(value) =>
              `${value == undefined || value == null ? "" : value}`
            }
          />
          <div className="flex flex-row gap-2 text-sm font-normal items-center">
            <Checkbox
              {...controllerTop.field}
              checked={controllerTop.field.value}
            />
            <p>{t("clients.filters.topUniversities")}</p>
          </div>
        </div>
      </TitleBlock>
    </Field>
  );
};
