import React, { useState, useContext } from "react";
import { ConfigProvider } from "antd";
import {
  FormProvider,
  useForm,
  useFieldArray,
  Controller,
} from "react-hook-form";
import BlueCrossIcon from "@/public/svg/blue-cross.svg";
import RedCrossBigIcon from "@/public/svg/red-cross-big.svg";
import { Input, Button } from "@ui/index";
import { Checkbox } from "antd";
import { useTranslation } from "react-i18next";
import { patchProfile } from "@api/index";
import { ErrorMessage } from "@hookform/error-message";

export function FormChosenUniversities({
  data,
  id,
  setData,
  cancel,
}: {
  data: any[];
  id: number;
  setData: (data: any) => void;
  cancel: () => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();

  const form = useForm({
    defaultValues: { universities: data },
  });

  const { control, handleSubmit, formState } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "universities",
    rules: { maxLength: 100 },
  });

  const onSubmit = async (data: any) => {
    if (formState.isDirty) {
      try {
        const validUniversities = data.universities.filter(
          (item: { university: string; top: boolean }) => item.university !== ""
        );
        const changedData: any = {
          id: id,
          targetDetailsUniversity: validUniversities,
        };
        const response = await patchProfile(changedData);
        setData(response.targetDetailsUniversity);
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
    <ConfigProvider
      theme={{
        token: {
          colorSplit: "#fff",
        },
      }}
    >
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
          style={{
            gap: "16px",
          }}
        >
          {fields.map((field, index) => (
            <section
              key={field.id}
              className="flex flex-row gap-4 items-center w-full"
            >
              <Controller
                control={control}
                name={`universities.${index}.university`}
                rules={{ required: true }}
                render={({ field }) => (
                  <div className="flex flex-col w-full">
                    <Input
                      className="borderedSelect"
                      value={field.value}
                      onChange={field.onChange}
                    />
                    <ErrorMessage
                      errors={formState.errors}
                      name={`universities.${index}.university`}
                      render={() => (
                        <p className="text-xs text-red-saturated">
                          {t("widgets.education.error")}
                        </p>
                      )}
                    ></ErrorMessage>
                  </div>
                )}
              />
              <div className="flex flex-row gap-2 items-center">
                <Controller
                  control={control}
                  name={`universities.${index}.top`}
                  render={({ field }) => (
                    <Checkbox checked={field.value} {...field} />
                  )}
                />
                <h1 className="text-sm font-normal">
                  {t("widgets.chosenUniversities.top")}
                </h1>
              </div>
              <button onClick={() => remove(index)}>
                <RedCrossBigIcon />
              </button>
            </section>
          ))}
          <div className="mt-4">
            <button
              className="flex flex-row items-center gap-2"
              type="button"
              onClick={() => append({ university: "", top: false })}
            >
              <BlueCrossIcon />
              <p className="text-blue-highlight font-semibold">
                {t("widgets.chosenUniversities.add")}
              </p>
            </button>
          </div>
          <div className={"flex items-center gap-4 mt-8"}>
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
        </form>
      </FormProvider>
    </ConfigProvider>
  );
}
