import { Controller } from "react-hook-form";
import { Input } from "@ui/index";
import { useTranslation } from "react-i18next";
import { ErrorMessage } from "@hookform/error-message";
import styled from "styled-components";

interface Props {
  form: any;
  prefixFormat: string;
}

export function FieldNameDocument({ form, prefixFormat }: Props) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-2 mb-1 w-full relative">
      <Controller
        control={form.control}
        name={"originalName"}
        render={({ field }) => (
          <CustomInput
            addonAfter={prefixFormat}
            placeholder={t("storage.formText.placeholderNameDoc")}
            size={"large"}
            isAtAllow={true}
            isNoValid={true}
            {...field}
          />
        )}
      />
      <ErrorMessage
        errors={form.formState.errors}
        name={"originalName"}
        render={(error) => (
          <p className="text-xs text-red-saturated absolute -bottom-4">
            {t(error.message)}
          </p>
        )}
      />
    </div>
  );
}

const CustomInput = styled(Input)`
  input : {
    min-height: 100% !important;
    width: 100% !important;
  }
`;
