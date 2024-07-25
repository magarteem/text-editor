import React from "react";
import { Button } from "@ui/index";
import { useTranslation } from "react-i18next";

export function Footer({
  handleCancel,
  disable,
}: {
  handleCancel: () => void;
  disable: boolean;
}) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-row gap-6 items-center mt-12">
      <Button
        type={"button"}
        $type={"secondary"}
        onClick={handleCancel}
        disabled={disable}
      >
        {t("workflow.visibilityClient.cancel")}
      </Button>
      <Button type={"submit"} disabled={disable}>
        <p>{t("workflow.visibilityClient.save")}</p>
      </Button>
    </div>
  );
}
