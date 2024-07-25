import React from "react";
import { FormProvider } from "react-hook-form";
import { Button } from "@ui/index";
import {
  //FieldClient,
  FieldCurator,
  FieldStrategist,
  FieldTypeDocument,
} from "./fields";
import { useTranslation } from "react-i18next";
import { FieldClient } from "@/app/shared/ui/formSelectClients/FieldClient";

interface Props {
  form: any;
  onSubmit: any;
  loading: boolean;
  curatorList: any;
  clientList: any;
  strategistList: any;
}

export function SidebarForm({
  form,
  onSubmit,
  loading,
  curatorList,
  clientList,
  strategistList,
}: Props) {
  const { t } = useTranslation();

  return (
    <div className="h-full">
      <div>
        <FormProvider {...form}>
          <form
            className="flex flex-col gap-4 pb-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FieldCurator form={form} curatorList={curatorList} />
            {form.watch("inProgressOthers") && (
              <FieldStrategist form={form} strategistList={strategistList} />
            )}
            {/*<FieldClient form={form} clientList={clientList} />*/}
            <FieldClient
              form={form}
              name="typeOfClient"
              label="qa.filters.client"
              placeholder="qa.filters.client"
              //placeholder="qa.filters.search"
            />
            <FieldTypeDocument form={form} />

            <div className="flex flex-col items-center justify-center gap-4 mt-2">
              <button
                className="text-blue-highlight text-sm"
                onClick={() => {
                  form.reset();
                  form.handleSubmit(onSubmit);
                }}
              >
                {t("qa.filters.clearFilters")}
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
                  {t("qa.filters.applyFilters")}
                </p>
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
