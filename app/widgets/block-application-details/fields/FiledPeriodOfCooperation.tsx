"use client";
import { Field } from "@widgets/index";
import { FormState } from "../types/types";
import { useController } from "react-hook-form";
import { TitleBlock } from "../ui";
import { useTranslation } from "react-i18next";
import { DatePicker } from "@ui/index";
import { useProfileStore } from "@store/index";
import { useStore } from "zustand";
import dayjs from "dayjs";

export function FieldPeriodOfCooperation({ reset }: { reset: any }) {
  const { t } = useTranslation();
  const userProfile = useStore(useProfileStore);

  const controllerStart = useController<FormState>({
    name: "targetDetailsStartDate",
  });

  const controllerEnd = useController<FormState>({
    name: "targetDetailsEndDate",
  });

  return (
    <Field>
      <TitleBlock title={t("widgets.ApplicationDetails.periodOfCooperation")}>
        <div className="flex flex-row gap-1 items-centers">
          <DatePicker
            disabled={userProfile?.roleType !== "Administrator"}
            className="max-w-32 text-sm borderedSelect"
            style={{
              borderRadius: "12px",
            }}
            placeholder={t("widgets.ApplicationDetails.emptyDatePicker")}
            format={"DD.MM.YYYY"}
            name={controllerStart.field.name}
            value={
              controllerStart.field.value
                ? dayjs(controllerStart.field.value as number)
                : null
            }
            minDate={dayjs("01.01.1900", "DD.MM.YYYY")}
            maxDate={
              controllerEnd.field.value &&
              dayjs(controllerEnd.field.value as number)
            }
            onChange={(date) => {
              if (date) {
                const dateNumber = date.unix() * 1000;
                controllerStart.field.onChange(dateNumber);
              } else {
                controllerStart.field.onChange(null);
              }
            }}
          />
          <div className="flex items-center justify-center">
            <span>-</span>
          </div>
          <DatePicker
            className="max-w-32 text-sm borderedSelect"
            disabled={userProfile?.roleType !== "Administrator"}
            size={"small"}
            name={controllerEnd.field.name}
            placeholder={t("widgets.ApplicationDetails.emptyDatePicker")}
            format={"DD.MM.YYYY"}
            value={
              controllerEnd.field.value
                ? dayjs(controllerEnd.field.value as number)
                : null
            }
            minDate={
              controllerStart.field.value &&
              dayjs(controllerStart.field.value as number)
            }
            onChange={(date) => {
              if (date) {
                const dateNumber = date.unix() * 1000;
                controllerEnd.field.onChange(dateNumber);
              } else {
                controllerEnd.field.onChange(null);
              }
            }}
          />
        </div>
      </TitleBlock>
    </Field>
  );
}
