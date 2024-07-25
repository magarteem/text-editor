"use client";
import { Select } from "@ui/index";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Field, Label } from "../ui";
import {
  libDocStatus,
  libDocStatusForDocAsLink,
} from "../helpers/libDocStatus";

interface Props {
  form: any;
  linkFile: boolean;
}

export const FieldStatusDocument = ({ form, linkFile }: Props) => {
  const { t } = useTranslation();

  const filterLibDocStatus = linkFile ? libDocStatusForDocAsLink : libDocStatus;

  const options = Object.entries(filterLibDocStatus).map(([key, label]) => ({
    label: t(label),
    value: key,
  }));

  return (
    <Field classNames="max-w-96">
      <Label>{t("storage.formText.titleFormDocTextStatus")}</Label>

      <Controller
        name="status"
        control={form.control}
        render={({ field }) => (
          <Select
            placeholder={t("storage.docTypes.WorkingWithCurator")}
            size={"large"}
            options={options}
            {...field}
          />
        )}
      />
    </Field>
  );
};
