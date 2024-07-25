import { Button } from "@ui/index";
import { useTranslation } from "react-i18next";

interface Props {
  onEdit?(): void;
  isSubmitting: boolean;
  form: any;
}
export const Footer = ({ onEdit, form, isSubmitting }: Props) => {
  const { t } = useTranslation();
  return (
    <div className={"flex items-center gap-4"}>
      <Button type={"button"} $type={"secondary"} onClick={onEdit}>
        {t("button.cancel")}
      </Button>
      <Button
        type={"submit"}
        disabled={isSubmitting || !form.formState.isDirty}
      >
        <p
          className={!form.formState.isDirty || isSubmitting ? "text-gray" : ""}
        >
          {isSubmitting ? t("button.saving") : t("button.save")}
        </p>
      </Button>
    </div>
  );
};
