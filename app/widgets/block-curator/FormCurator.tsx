import { Select } from "@/app/shared/ui/antd/select/index";
import { Button } from "@ui/index";
import React, { useState, useEffect } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useGetCuratorsList } from "@hooks/useGetCuratorasList";
import { Avatar } from "antd";
import { assignCurator, deleteCurator } from "@api/index";

export function FormCurator({
  curator,
  cancel,
  setData,
  id,
}: {
  curator: any;
  id: number;
  setData: any;
  cancel: () => void;
}) {
  const { t } = useTranslation();
  const { fetchRecords, dataSource, loading } = useGetCuratorsList();
  const [description, setDescription] = useState(curator?.aboutMe || null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm({
    defaultValues: {
      curator: curator
        ? {
            value: curator.id,
            label: curator.label,
            imageUrl: curator.imageUrl,
            aboutMe: curator.aboutMe,
          }
        : null,
    },
  });

  useEffect(() => {
    fetchRecords();
  }, []);

  const onSubmit = async (data: any) => {
    if (!form.formState.isDirty) return;
    setIsSubmitting(true);
    try {
      if (curator) {
        await deleteCurator({ clientId: id, employeeId: curator.value });
      }
      const response = await assignCurator({
        clientId: id,
        employeeId: data.curator,
      });

      const currCurator = dataSource.find(
        (cur: any) => cur.value === data.curator
      );
      setData(currCurator);
    } catch (err) {
      setIsSubmitting(false);
      cancel();
    } finally {
      setIsSubmitting(false);
      cancel();
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Controller
          name="curator"
          {...form.register}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              value={field.value}
              onChange={field.onChange}
              className="borderedSelect max-w-96"
              style={{ width: "250px" }}
              optionRender={(item) => (
                <div
                  className="flex flex-row gap-2 items-center"
                  onClick={() =>
                    item.data.aboutMe
                      ? setDescription(item.data.aboutMe)
                      : setDescription("-")
                  }
                >
                  <Avatar size={24} src={item.data.imageUrl} />
                  <p>{item.label}</p>
                </div>
              )}
              labelRender={(item) => {
                const currentCurator = dataSource.find(
                  (cur: { value: number; label: string }) =>
                    cur.label === item.label
                ) as any;
                console.log("currentCurator", currentCurator);
                return (
                  <div className="flex flex-row gap-2 items-center">
                    <Avatar size={24} src={currentCurator?.imageUrl} />
                    <p>{item.label}</p>
                  </div>
                );
              }}
              loading={loading}
              options={dataSource}
              disabled={loading}
              optionFilterProp="label"
            />
          )}
        />
        <p className="text-sm font-normal mt-4">
          {!!description && (
            <div
              dangerouslySetInnerHTML={{
                __html:
                  description === "-" ? description : description.slice(1, -1),
              }}
            />
          )}
        </p>
        <div className="flex items-center gap-4 mt-8">
          <Button type="button" $type="secondary" onClick={cancel}>
            {t("button.cancel")}
          </Button>
          <Button
            type="submit"
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
  );
}
