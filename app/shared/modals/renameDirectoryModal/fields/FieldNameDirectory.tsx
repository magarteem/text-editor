import { Controller } from "react-hook-form";
import { Field } from "@/app/widgets";
import { Input } from "@ui/index";
import { useTranslation } from "react-i18next";
import { ErrorMessage } from "@hookform/error-message";
import styled from "styled-components";

interface FieldConfirmPassProps {
  form: any;
}

export function FieldNameDirectory({ form }: FieldConfirmPassProps) {
  const { t } = useTranslation();

  return (
    <Field>
      <div className="flex flex-col gap-2 mb-1 w-full relative">
        <Controller
          control={form.control}
          name={"name"}
          render={({ field }) => (
            <CustomInput
              placeholder={t("storage.formText.placeholderCatalogName")}
              size={"large"}
              isAtAllow={true}
              isNoValid={true}
              name={field.name}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <ErrorMessage
          errors={form.formState.errors}
          name={"name"}
          render={(error) => (
            <p className="text-xs text-red-saturated absolute -bottom-4">
              {t(error.message)}
            </p>
          )}
        ></ErrorMessage>
      </div>
    </Field>
  );
}

const CustomInput = styled(Input)`
  input : {
    min-height: 100% !important;
    width: 100% !important;
  }
`;
