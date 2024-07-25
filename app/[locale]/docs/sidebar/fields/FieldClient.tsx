import { Select } from "@/app/shared/ui/antd/select/index";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Avatar } from "antd";
import { Field, Label } from "@/app/widgets";

export function FieldClient({
  form,
  clientList,
}: {
  form: any;
  clientList: any;
}) {
  const { t } = useTranslation();

  return (
    <Field>
      <Label>{t("qa.filters.client")}</Label>
      <Controller
        name="typeOfClient"
        {...form.register}
        render={({ field }) => (
          <Select
            value={field.value}
            onChange={field.onChange}
            size="large"
            className="borderedSelect"
            placeholder={t("qa.filters.search")}
            optionRender={(item) => (
              <div
                className="flex flex-row gap-2 items-center"
                onClick={() => field.onChange(item.value)}
              >
                <Avatar size={24} src={item.data.imageUrl} />
                <p>{item.label}</p>
              </div>
            )}
            labelRender={(item) => {
              const currentCurator = clientList.data.find(
                (cur: { value: number; label: string }) =>
                  cur.label === item.label
              ) as any;
              return (
                <div className="flex flex-row gap-2 items-center">
                  <Avatar size={24} src={currentCurator?.imageUrl} />
                  <p>{item.label}</p>
                </div>
              );
            }}
            loading={clientList.loading}
            options={clientList.data}
            disabled={clientList.loading}
            optionFilterProp="label"
          />
        )}
      />
    </Field>
  );
}
