import React from "react";
import { FormProvider } from "react-hook-form";
import { Button } from "@ui/index";
import {
  FieldNumberOfUniversities,
  FieldCountryOfEntry,
  FieldCountryOfResidence,
  FieldCurator,
  FieldExams,
  FieldGrade,
  FiledTypeOfClient,
  FieldTypeOfService,
  FieldYearOfEnrollment,
  FieldTemplate,
  FiledStage,
  FieldWorkComplete,
} from "./fields";
import { useTranslation } from "react-i18next";
import { useStore } from "zustand";
import { useProfileStore } from "@store/index";

export function SidebarForm({
  form,
  onSubmit,
  loading,
  curatorList,
  countriesList,
  admissionCountriesList,
  templateList,
}: {
  form: any;
  onSubmit: any;
  loading: boolean;
  curatorList: any;
  countriesList: any;
  admissionCountriesList: any;
  templateList: any;
}) {
  const { t } = useTranslation();
  const profile = useStore(useProfileStore);

  return (
    <div className="h-full">
      <div>
        <FormProvider {...form}>
          <form
            className="flex flex-col gap-4 pb-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FieldTypeOfService />
            <FieldCountryOfEntry
              admissionCountriesList={admissionCountriesList}
            />
            <FieldGrade />
            <FiledTypeOfClient />
            <FieldYearOfEnrollment />
            <FieldCountryOfResidence countriesList={countriesList} />
            <FieldExams />
            <FieldNumberOfUniversities />
            {profile?.roleType !== "Curator" && (
              <FieldCurator form={form} curatorList={curatorList} />
            )}
            <FieldTemplate templateList={templateList} />
            <FiledStage form={form} />
            <FieldWorkComplete />
            <div className="flex flex-col items-center justify-center gap-4 mt-2">
              <button
                className="text-blue-highlight text-sm"
                onClick={() => {
                  form.reset();
                  form.handleSubmit(onSubmit);
                }}
              >
                {t("clients.filters.clearFilters")}
              </button>
              <Button
                type="submit"
                disabled={loading || !form.formState.isDirty}
              >
                <p
                  className={
                    loading || !form.formState.isDirty ? "text-gray" : ""
                  }
                >
                  {t("clients.filters.applyFilters")}
                </p>
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
