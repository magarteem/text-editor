"use client";
import { Label, Field } from "@widgets/index";
import { Select } from "@ui/index";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  libDocStatus,
  libDocStatusForDocAsLink,
} from "@/app/widgets/block-client-document/helpers/libDocStatus";

interface Props {
  form: any;
  linkFile?: boolean;
}

export const FieldStatusDocument = ({ form, linkFile }: Props) => {
  const { t } = useTranslation();

  const filterLibDocStatus = linkFile ? libDocStatusForDocAsLink : libDocStatus;

  const options = Object.entries(filterLibDocStatus).map(([key, label]) => ({
    label: t(label),
    value: key,
  }));

  return (
    <Field>
      <Label>{t("storage.formText.titleFormDocTextStatus")}</Label>

      <Controller
        name="docStatus"
        control={form.control}
        render={({ field: { onChange, ...field } }) => (
          <Select
            placeholder={t("storage.docTypes.WorkingWithCurator")}
            size={"large"}
            options={options}
            onChange={onChange}
            {...field}
          />
        )}
      />
    </Field>
  );
};
