import React, { useState } from "react";
import { Button } from "@ui/index";
import { Props } from "../block-user";
import { FormProvider, useForm } from "react-hook-form";
import { FormState } from "./types/types";
import { patchProfile } from "@api/index";
import {
  FieldTypeOfService,
  FieldDegree,
  FieldNumberOfUniversities,
  FieldNumberTopUniversities,
  FieldProgram,
  FieldYearOfEnrollment,
  FieldCountryOfEntry,
  FieldPeriodOfCooperation,
} from "./fields";
import { useTranslation } from "react-i18next";

export default function FormApplicationDetails({
  cancel,
  profile,
  setProfile,
}: {
  cancel: () => void;
  profile: Props["profile"];
  setProfile: (data: any) => void;
}) {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    targetDetailsStartDate,
    targetDetailsEndDate,
    targetDetailsCountryForAdmission,
    targetDetailsTypeOfService,
    targetDetailsPersonDegree,
    targetDetailsNumberOfTopUniversities,
    targetDetailsYear,
    targetDetailsProgram,
    targetDetailsNumberOfUniversities,
  } = profile;

  const form = useForm<FormState>({
    defaultValues: {
      targetDetailsStartDate: targetDetailsStartDate,
      targetDetailsEndDate: targetDetailsEndDate,
      targetDetailsCountryForAdmission:
        targetDetailsCountryForAdmission.length >= 1
          ? targetDetailsCountryForAdmission.map((item: any) => ({
              label: item.country,
              value: item.id,
            }))
          : [],
      targetDetailsTypeOfService: targetDetailsTypeOfService,
      targetDetailsPersonDegree: targetDetailsPersonDegree,
      targetDetailsNumberOfTopUniversities:
        targetDetailsNumberOfTopUniversities,
      targetDetailsYear: targetDetailsYear,
      targetDetailsProgram: targetDetailsProgram,
      targetDetailsNumberOfUniversities: targetDetailsNumberOfUniversities,
    },
  });

  const onSubmit = async (data: FormState) => {
    if (form.formState.isDirty) {
      setIsSubmitting(true);
      const changedFields: any = {
        id: profile.id,
        targetDetailsCountryForAdmissionId: data.targetDetailsCountryForAdmission.length >= 1 ? (data
          .targetDetailsCountryForAdmission[0].label
          ? data.targetDetailsCountryForAdmission.map(
              (country: { label: string; value: number }) => country.value
            )
          : data.targetDetailsCountryForAdmission) : [],
        targetDetailsStartDate: data.targetDetailsStartDate,
        targetDetailsEndDate: data.targetDetailsEndDate,
        ...data,
      };

      delete changedFields.targetDetailsCountryForAdmission;

      try {
        const response = await patchProfile(changedFields);
        setProfile(response);
      } catch (err) {
        setIsSubmitting(false);
        cancel();
      } finally {
        setIsSubmitting(false);
        cancel();
      }
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <FieldTypeOfService />
            <FieldCountryOfEntry />
            <FieldDegree />
            <FieldNumberTopUniversities />
          </div>
          <div className="flex flex-col gap-4">
            <FieldPeriodOfCooperation reset={form.resetField} />
            <FieldYearOfEnrollment />
            <FieldProgram />
            <FieldNumberOfUniversities />
          </div>
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
        </div>
      </form>
    </FormProvider>
  );
}
