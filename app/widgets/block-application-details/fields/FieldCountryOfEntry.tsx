"use client";
import { useEffect } from "react";
import { Field } from "@widgets/index";
import { FormState } from "../types/types";
import { useController } from "react-hook-form";
import { TitleBlock } from "../ui";
import { SelectCustom } from "@ui/index";
import { useTranslation } from "react-i18next";
import { useGetCountriesList } from "../../../shared/hooks/useGetCountriesList";

export function FieldCountryOfEntry() {
  const { t } = useTranslation();
  const { fetchRecords, dataSource } = useGetCountriesList({
    forAdmission: true,
  });

  useEffect(() => {
    fetchRecords();
  }, []);

  const controller = useController<FormState>({
    name: "targetDetailsCountryForAdmission",
  });

  return (
    <Field>
      <TitleBlock
        title={t("widgets.ApplicationDetails.countryOfEntry")}
        isActive={true}
      >
        <SelectCustom
          mode="multiple"
          options={dataSource}
          defaultValue={controller.field?.value}
          onChange={controller.field.onChange}
          optionFilterProp="label"
        />
      </TitleBlock>
    </Field>
  );
}
