"use client";
import { Field } from "@widgets/index";
import { useController } from "react-hook-form";
import { SelectCustom } from "@ui/index";
import { Label } from "@widgets/index";
import { useTranslation } from "react-i18next";

export function FieldCountryOfEntry({
  admissionCountriesList,
}: {
  admissionCountriesList: any;
}) {
  const { t } = useTranslation();

  const controller = useController<any>({
    name: "countryOfDestination",
  });

  return (
    <Field>
      <Label>{t("widgets.ApplicationDetails.countryOfEntry")}</Label>
      <SelectCustom
        isCustom={true}
        mode="multiple"
        options={admissionCountriesList.dataSource}
        disabled={admissionCountriesList.loading}
        size={"large"}
        value={controller.field?.value}
        className={"whitespace-nowrap"}
        placeholder={t("widgets.ApplicationDetails.countryOfEntry")}
        onChange={controller.field.onChange}
        optionFilterProp="label"
        style={{
          maxWidth: "222px",
        }}
      />
    </Field>
  );
}
