import React from "react";
import { Button } from "@ui/index";
import { useTranslation } from "react-i18next";
import { UseFormReturn } from "react-hook-form";

interface FooterProps {
  cancel: () => void;
  loading: boolean;
  form: UseFormReturn;
}

export function Footer({ cancel, loading, form }: FooterProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <div>
      <div className="flex items-center gap-4 mt-4">
        <Button type="button" $type="secondary" onClick={cancel}>
          {t("button.cancel")}
        </Button>
        <Button type="submit" disabled={!form.formState.isDirty || loading}>
          <p className={!form.formState.isDirty ? "text-gray" : ""}>
            {t("button.save")}
          </p>
        </Button>
      </div>
    </div>
  );
}
