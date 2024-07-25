import React from "react";
import { Checkbox } from "antd";
import { Label, Field, FormState } from "@widgets/index";
import { useController } from "react-hook-form";
import { useTranslation } from "react-i18next";

export function FieldExams() {
  const { t } = useTranslation();

  const { field: TOEFLField } = useController({
    name: "TOEFL",
    defaultValue: false,
  });

  const { field: IELTSField } = useController({
    name: "IELTS",
    defaultValue: false,
  });

  const { field: SATField } = useController({
    name: "SAT",
    defaultValue: false,
  });

  const { field: GREField } = useController({
    name: "GRE",
    defaultValue: false,
  });

  const { field: GMATField } = useController({
    name: "GMAT",
    defaultValue: false,
  });

  const { field: OtherField } = useController({
    name: "Other",
    defaultValue: false,
  });

  return (
    <Field>
      <Label>{t("clients.filters.exams")}</Label>
      <div className="flex flex-row gap-4 items-center">
        <div>
          <div className="flex flex-row gap-3 text-sm font-normal">
            <Checkbox {...TOEFLField} checked={TOEFLField.value} />
            <p>{t("clients.filters.examsType.TOEFL")}</p>
          </div>
          <div className="flex flex-row gap-3 text-sm font-normal">
            <Checkbox {...IELTSField} checked={IELTSField.value} />
            <p>{t("clients.filters.examsType.IELTS")}</p>
          </div>
          <div className="flex flex-row gap-3 text-sm font-normal">
            <Checkbox {...SATField} checked={SATField.value} />
            <p>{t("clients.filters.examsType.SAT")}</p>
          </div>
        </div>
        <div>
          <div className="flex flex-row gap-3 text-sm font-normal">
            <Checkbox {...GREField} checked={GREField.value} />
            <p>{t("clients.filters.examsType.GRE")}</p>
          </div>
          <div className="flex flex-row gap-3 text-sm font-normal">
            <Checkbox {...GMATField} checked={GMATField.value} />
            <p>{t("clients.filters.examsType.GMAT")}</p>
          </div>
          <div className="flex flex-row gap-3 text-sm font-normal">
            <Checkbox {...OtherField} checked={OtherField.value} />
            <p>{t("clients.filters.examsType.other")}</p>
          </div>
        </div>
      </div>
    </Field>
  );
}
