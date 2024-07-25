"use client";
import { Field, Label, FormState } from "@widgets/index";
import { useController } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { InputNumber } from "antd";
import DownChevronIcon from "@/public/svg/chevron-down.svg";
import TopChevronIcon from "@/public/svg/chevron-top.svg";

export const DurationOfCallsSpentField = ({ isOnlyView }: { isOnlyView?: boolean}) => {
  const { t } = useTranslation();
  const controller = useController<FormState>({
    name: "durationOfCallsSpent",
  });
  return (
    <Field>
      <Label>{t("clients.userForm.durationOfCallsSpent")}</Label>
      <InputNumber
        max={10000}
        min={0}
        className="borderedSelect font-normal"
        style={{ width: 224, fontSize: 14 }}
        placeholder={t("clients.userForm.durationOfCallsPlanned")}
        size={"large"}
        name={controller.field.name}
        value={controller.field.value as number}
        onChange={controller.field.onChange}
        disabled={isOnlyView}
        controls={{
          upIcon: <TopChevronIcon />,
          downIcon: <DownChevronIcon />,
        }}
      />
    </Field>
  );
};
