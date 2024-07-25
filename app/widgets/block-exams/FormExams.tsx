import React, { useState } from "react";
import { ConfigProvider } from "antd";
import {
  FormProvider,
  useForm,
  useFieldArray,
  Controller,
} from "react-hook-form";
import BlueCrossIcon from "@/public/svg/blue-cross.svg";
import RedCrossBigIcon from "@/public/svg/red-cross-big.svg";
import { Input, Button, Select, DatePicker } from "@ui/index";
import { useTranslation } from "react-i18next";
import { ErrorMessage } from "@hookform/error-message";
import { patchProfile } from "@api/index";
import dayjs from "dayjs";
import { patchExams } from "@/app/shared/api/request/patchExam";

export function FormExams({
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
  const currDate = new Date();
  const { t } = useTranslation();

  const form = useForm({
    defaultValues: { exams: data },
  });

  const { control, handleSubmit, formState, watch } = form;

  const grades = [
    { label: "TOEFL", value: "TOEFL" },
    { label: "IELTS", value: "IELTS" },
    { label: "SAT", value: "SAT" },
    { label: "GMAT", value: "GMAT" },
    { label: "GRE", value: "GRE" },
    { label: t("widgets.exams.other"), value: "Other" },
  ];

  const { fields, append, remove } = useFieldArray({
    control,
    name: "exams",
    rules: { maxLength: 100 },
  });

  const onSubmit = async (data: any) => {
    if (formState.isDirty) {
      try {
        const exams = data.exams.map((item: any) => {
          const exam = {
            ...item,
          };
          return exam;
        });
        const changedData: any = {
          clientId: id,
          exams: exams,
        };
        const response = await patchExams(changedData);
        setData(response);
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
          className="flex flex-col border-t border-gray border-opacity-20"
        >
          {fields.map((field, index) => (
            <section
              key={field.id}
              className="flex flex-row gap-4 w-full items-start border-b border-gray border-opacity-20 px-6 py-4"
            >
              <div className="flex flex-col w-full max-w-28">
                <h1 className="mb-2 font-semibold text-sm text-gray">
                  {t("widgets.exams.exam")}
                </h1>
                <Controller
                  control={control}
                  name={`exams.${index}.grade`}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      className="borderedSelect"
                      value={field.value}
                      options={grades}
                      onChange={field.onChange}
                    />
                  )}
                />
                <ErrorMessage
                  errors={formState.errors}
                  name={`exams.${index}.grade`}
                  render={() => (
                    <p className="text-xs text-red-saturated">
                      {t("widgets.exams.error")}
                    </p>
                  )}
                ></ErrorMessage>
              </div>
              <div className="flex flex-col w-full">
                <h1 className="mb-2 font-semibold text-sm text-gray">
                  {t("widgets.exams.result")}
                </h1>
                <Controller
                  control={control}
                  name={`exams.${index}.result`}
                  rules={{
                    required: watch(`exams.${index}.examDay`) ? false : true,
                  }}
                  render={({ field }) => (
                    <Input
                      className="borderedSelect"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                <ErrorMessage
                  errors={formState.errors}
                  name={`exams.${index}.result`}
                  render={() => (
                    <p className="text-xs text-red-saturated">
                      {t("widgets.exams.errorTwo")}
                    </p>
                  )}
                ></ErrorMessage>
              </div>
              <div className="flex flex-col w-full max-w-32">
                <h1 className="mb-2 font-semibold text-sm text-gray">
                  {t("widgets.exams.deadline")}
                </h1>
                <Controller
                  control={control}
                  name={`exams.${index}.examDay`}
                  rules={{
                    required: watch(`exams.${index}.result`) ? false : true,
                  }}
                  render={({ field }) => (
                    <DatePicker
                      className="borderedSelect"
                      style={{
                        borderRadius: "12px",
                      }}
                      format={"DD.MM.YYYY"}
                      name={field.name}
                      value={field.value ? dayjs(field.value as number) : null}
                      minDate={dayjs(currDate)}
                      placeholder={t(
                        "widgets.ApplicationDetails.emptyDatePicker"
                      )}
                      onChange={(date) => {
                        if (date) {
                          if (date.isAfter(dayjs(currDate))) {
                            const dateNumber = date.unix() * 1000;
                            field.onChange(dateNumber);
                          }
                        } else {
                          field.onChange(null);
                        }
                      }}
                    />
                  )}
                />
                <ErrorMessage
                  errors={formState.errors}
                  name={`exams.${index}.examDay`}
                  render={() => (
                    <p className="text-xs text-red-saturated">
                      {t("widgets.exams.errorTwo")}
                    </p>
                  )}
                ></ErrorMessage>
              </div>
              <button onClick={() => remove(index)}>
                <RedCrossBigIcon />
              </button>
            </section>
          ))}
          <div className="mt-4 px-6">
            <button
              className="flex flex-row items-center gap-2"
              type="button"
              onClick={() => append({ grade: "", result: "" })}
            >
              <BlueCrossIcon />
              <p className="text-blue-highlight font-semibold">
                {t("widgets.exams.add")}
              </p>
            </button>
          </div>
          <div className={"flex items-center gap-4 mt-8 px-6"}>
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
