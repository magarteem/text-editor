import React, { useState, useEffect } from "react";
import { useGetCountriesList } from "../../shared/hooks/useGetCountriesList";
import { ConfigProvider, Checkbox } from "antd";
import {
  FormProvider,
  useForm,
  useFieldArray,
  Controller,
} from "react-hook-form";
import BlueCrossIcon from "@/public/svg/blue-cross.svg";
import RedCrossBigIcon from "@/public/svg/red-cross-big.svg";
import { Input, Button, Select, DatePicker, InputNumber } from "@ui/index";
import { ErrorMessage } from "@hookform/error-message";
import { useTranslation } from "react-i18next";
import { RowWrapper } from "./ui";
import { patchEducations } from "@/app/shared/api/request/patchEducation";

export function FormEducation({
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

  const grades = [
    {
      label: t("widgets.education.grades.Schoolboy"),
      value: "Schoolboy",
    },
    {
      label: t("widgets.education.grades.CollegeStudent"),
      value: "CollegeStudent",
    },
    {
      label: t("widgets.education.grades.Bachelor"),
      value: "Bachelor",
    },
    {
      label: t("widgets.education.grades.Master"),
      value: "Master",
    },
    {
      label: t("widgets.education.grades.GraduateStudent"),
      value: "GraduateStudent",
    },
  ];

  const currDate = new Date();

  const form = useForm({
    defaultValues: {
      educationDetails: data.map((item) => ({
        ...item,
        country: {
          label: item.country.country,
          value: item.country.id,
        },
      })),
    },
  });

  const { control, handleSubmit, formState, watch } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "educationDetails",
    rules: { maxLength: 100 },
  });

  const { fetchRecords, dataSource } = useGetCountriesList({
    forAdmission: false,
  });

  useEffect(() => {
    fetchRecords();
  }, []);

  const onSubmit = async (data: any) => {
    if (formState.isDirty) {
      try {
        const validEducationItems = data.educationDetails.map((item: any) => {
          const validItem = {
            countryId: item.country.value ? item.country.value : item.country,
            ...item,
          };
          if (item.completionMarker) {
            validItem.classNumber = null;
          }
          delete validItem.country;
          return validItem;
        });
        const changedData: any = {
          clientId: id,
          educations: [...validEducationItems],
        };
        const response = await patchEducations(changedData);
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
              className="flex flex-row gap-4 w-full items-start border-b border-gray border-opacity-20 pt-4"
            >
              <div className="px-6 w-full mb-4">
                <div>
                  <div className="flex flex-row w-full justify-between mb-2">
                    <h3 className="text-gray text-sm font-semibold">{`${t("widgets.education.education")} №${index + 1}`}</h3>
                    <button onClick={() => remove(index)}>
                      <RedCrossBigIcon />
                    </button>
                  </div>
                  <Controller
                    control={control}
                    name={`educationDetails.${index}.educationalInstitution`}
                    rules={{ required: true }}
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
                    name={`educationDetails.${index}.educationalInstitution`}
                    render={() => (
                      <p className="text-xs text-red-saturated">
                        {t("widgets.education.error")}
                      </p>
                    )}
                  ></ErrorMessage>
                </div>
                <div className="mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-4">
                      <RowWrapper text={t("widgets.education.specialization")}>
                        <Controller
                          control={control}
                          name={`educationDetails.${index}.specialization`}
                          render={({ field }) => (
                            <Input
                              className="borderedSelect max-w-96"
                              value={field.value}
                              onChange={field.onChange}
                            />
                          )}
                        />
                      </RowWrapper>
                      <RowWrapper text={t("widgets.education.grade")}>
                        <>
                          <Controller
                            control={control}
                            name={`educationDetails.${index}.grade`}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <Select
                                className="borderedSelect max-w-96"
                                value={field.value}
                                options={grades}
                                onChange={field.onChange}
                              />
                            )}
                          />
                          <ErrorMessage
                            errors={formState.errors}
                            name={`educationDetails.${index}.grade`}
                            render={() => (
                              <p className="text-xs text-red-saturated">
                                {t("widgets.education.error")}
                              </p>
                            )}
                          ></ErrorMessage>
                        </>
                      </RowWrapper>
                      <RowWrapper text={t("widgets.education.graduation")}>
                        <Controller
                          control={control}
                          name={`educationDetails.${index}.yearOfCompletion`}
                          rules={{
                            required: true,
                            validate: (value) => {
                              if (
                                watch(
                                  `educationDetails.${index}.completionMarker`
                                )
                              ) {
                                return (
                                  value <= new Date().getFullYear() || false
                                );
                              }
                            },
                          }}
                          render={({ field }) => (
                            <InputNumber
                              min={1900}
                              max={
                                watch(
                                  `educationDetails.${index}.completionMarker`
                                )
                                  ? currDate.getFullYear()
                                  : 2090
                              }
                              className="borderedSelect"
                              value={field.value}
                              onChange={field.onChange}
                            />
                          )}
                        />
                        <ErrorMessage
                          errors={formState.errors}
                          name={`educationDetails.${index}.yearOfCompletion`}
                          render={() => (
                            <p className="text-xs text-red-saturated">
                              {t("widgets.education.errorCor")}
                            </p>
                          )}
                        ></ErrorMessage>
                      </RowWrapper>
                      <RowWrapper>
                        <div className="flex flex-row gap-2 items-center">
                          <Controller
                            control={control}
                            name={`educationDetails.${index}.completionMarker`}
                            render={({ field }) => (
                              <Checkbox checked={field.value} {...field} />
                            )}
                          />
                          <h1 className="text-sm font-normal">
                            {t("widgets.education.completed")}
                          </h1>
                        </div>
                      </RowWrapper>
                    </div>
                    <div className="flex flex-col gap-4">
                      <RowWrapper text={t("widgets.education.GPA")}>
                        <Controller
                          control={control}
                          name={`educationDetails.${index}.gpa`}
                          render={({ field }) => (
                            <Input
                              className="borderedSelect max-w-96"
                              value={field.value}
                              onChange={field.onChange}
                            />
                          )}
                        />
                      </RowWrapper>
                      <RowWrapper text={t("widgets.education.classNum")}>
                        <Controller
                          control={control}
                          name={`educationDetails.${index}.classNumber`}
                          rules={{
                            required: watch(
                              `educationDetails.${index}.completionMarker`
                            )
                              ? false
                              : true,
                          }}
                          render={({ field }) => (
                            <InputNumber
                              min={0}
                              max={9}
                              className="borderedSelect"
                              disabled={watch(
                                `educationDetails.${index}.completionMarker`
                              )}
                              value={
                                watch(
                                  `educationDetails.${index}.completionMarker`
                                )
                                  ? null
                                  : field.value
                              }
                              onChange={field.onChange}
                            />
                          )}
                        />
                        <ErrorMessage
                          errors={formState.errors}
                          name={`educationDetails.${index}.classNumber`}
                          render={() => (
                            <p className="text-xs text-red-saturated">
                              {t("widgets.education.error")}
                            </p>
                          )}
                        ></ErrorMessage>
                      </RowWrapper>
                      <RowWrapper text={t("widgets.education.country")}>
                        <>
                          <Controller
                            control={control}
                            name={`educationDetails.${index}.country`}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <Select
                                className="borderedSelect max-w-96"
                                optionFilterProp="label"
                                showSearch={true}
                                options={dataSource}
                                value={field.value}
                                onChange={field.onChange}
                              />
                            )}
                          />
                          <ErrorMessage
                            errors={formState.errors}
                            name={`educationDetails.${index}.country`}
                            render={() => (
                              <p className="text-xs text-red-saturated">
                                {t("widgets.education.error")}
                              </p>
                            )}
                          ></ErrorMessage>
                        </>
                      </RowWrapper>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}
          <div className="mt-4 px-6">
            <button
              className="flex flex-row items-center gap-2"
              type="button"
              onClick={() =>
                append({
                  educationalInstitution: "",
                  grade: "",
                  gpa: "",
                  specialization: "",
                  classNumber: null,
                  country: null,
                  completionMarker: null,
                  yearOfCompletion: null,
                })
              }
            >
              <BlueCrossIcon />
              <p className="text-blue-highlight font-semibold">
                {t("widgets.education.add")}
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
