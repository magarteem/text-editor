import { Field, Label } from "@/app/widgets";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Input } from "antd";
import { Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const { TextArea } = Input;

interface Props {
  form: any;
}

export function FieldTextArea({ form }: Props) {
  const { t } = useTranslation();

  return (
    <Field>
      <Label>{t("storage.formText.titleFormDocText")}</Label>
      <Controller
        name="docDescription"
        control={form.control}
        render={({ field }) => (
          <div className="flex flex-col gap-2 w-full relative">
            <CustomTextArea autoSize={{ minRows: 2, maxRows: 6 }} {...field} />
            <ErrorMessage
              errors={form.formState.errors}
              name="docDescription"
              render={(error) => (
                <p className="text-xs text-red-saturated absolute -bottom-4">
                  {t(error.message)}
                </p>
              )}
            />
          </div>
        )}
      />
    </Field>
  );
}

const CustomTextArea = styled(TextArea)`
  min-height: 100% !important;
  width: 100% !important;
  border-radius: ${({ theme }) => theme.radius.xxl} !important;
`;
