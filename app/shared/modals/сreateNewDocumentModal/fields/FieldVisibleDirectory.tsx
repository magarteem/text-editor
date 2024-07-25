import { Controller } from "react-hook-form";
import { Field } from "@/app/widgets";
import { CheckedVisible } from "../ui/CheckedVisible";

interface FieldConfirmPassProps {
  form: any;
}

export function FieldVisibleDirectory({ form }: FieldConfirmPassProps) {
  return (
    <Field>
      <div className="flex flex-col gap-2 mb-1 relative">
        <Controller
          control={form.control}
          name={"visible"}
          render={({ field }) => (
            <CheckedVisible isChecked={field.value} onChange={field.onChange} />
          )}
        />
      </div>
    </Field>
  );
}
