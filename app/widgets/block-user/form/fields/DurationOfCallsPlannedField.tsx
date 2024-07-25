import { Label, Field, FormState } from "@widgets/index";
import { Input } from "@ui/index";
import { useController } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { InputNumber } from "antd";
import DownChevronIcon from "@/public/svg/chevron-down.svg";
import TopChevronIcon from "@/public/svg/chevron-top.svg";

export const DurationOfCallsPlannedField = ({ isOnlyView }: { isOnlyView?: boolean}) => {
  const { t } = useTranslation();
  const controller = useController<FormState>({
    name: "durationOfCallsPlanned",
  });

  return (
    <Field>
      <Label>{t("clients.userForm.durationOfCallsPlanned")}</Label>
      <InputNumber
        max={10000}
        min={0}
        className="borderedSelect font-normal"
        style={{ width: 224, fontSize: 14 }}
        placeholder={t("clients.userForm.durationOfCallsPlanned")}
        size={"large"}
        name={controller.field.name}
        disabled={isOnlyView}
        value={controller.field.value as number}
        onChange={controller.field.onChange}
        controls={{
          upIcon: <TopChevronIcon />,
          downIcon: <DownChevronIcon />,
        }}
      />
    </Field>
  );
};
