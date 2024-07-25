import { Button, InputNumber } from "@ui/index";
import { Props } from "../block-user";
import { patchProfile } from "@api/index";
import { Field } from "@widgets/index";
import { FormProvider, useForm, useController } from "react-hook-form";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const ChancesForm = ({
  profile,
  cancel,
  value,
  setValue,
}: {
  profile: Props["profile"];
  cancel: () => void;
  value: number;
  setValue: (num: number) => void;
}) => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<any>({
    defaultValues: {
      caseStatusChanceOfScholarship: value,
    },
  });

  const { field } = useController<any>({
    control: form.control,
    name: "caseStatusChanceOfScholarship",
  });

  const onSubmit = async (data: any) => {
    if (form.formState.isDirty) {
      if (data.caseStatusChanceOfScholarship !== value) {
        try {
          setIsSubmitting(true);
          const changedFields: any = { id: profile.id, ...data };
          const response = await patchProfile(changedFields);
          setValue(response.caseStatusChanceOfScholarship);
        } catch (err) {
          setIsSubmitting(false);
          cancel();
        } finally {
          setIsSubmitting(false);
          cancel();
        }
      }
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Field>
          <InputNumber
            min={0}
            max={100}
            onChange={field.onChange}
            value={field.value}
            defaultValue={field.value}
          />
          <div className={"flex items-center gap-4 mt-4"}>
            <Button type={"button"} $type={"secondary"} onClick={cancel}>
              {t("button.cancel")}
            </Button>
            <Button
              type={"submit"}
              disabled={isSubmitting || !form.formState.isDirty}
            >
              <p
                className={
                  !form.formState.isDirty || isSubmitting ? "text-gray" : ""
                }
              >
                {isSubmitting ? t("button.saving") : t("button.save")}
              </p>
            </Button>
          </div>
        </Field>
      </form>
    </FormProvider>
  );
};
