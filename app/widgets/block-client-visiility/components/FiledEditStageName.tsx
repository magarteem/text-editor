import React from "react";
import { Input } from "@ui/index";
import { useController } from "react-hook-form";
import { fontSize } from "@/lib/theme/const/fontSize";

interface FieldEditStageNameProps {
  form: any;
}
export function FiledEditStageName({ form }: FieldEditStageNameProps) {
  const controller = useController({
    name: "name",
    control: form.control,
  });

  return (
    <Input
      style={{
        padding: "12px",
        display: "flex",
        width: "100%",
        fontSize: "16px",
      }}
      value={controller.field.value}
      onChange={controller.field.onChange}
    />
  );
}
