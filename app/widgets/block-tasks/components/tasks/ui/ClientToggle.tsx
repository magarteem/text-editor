import React from "react";
import { useTranslation } from "react-i18next";

interface ClientToggleProps {
  isCompleted: boolean;
  onToggle: (isCompleted: boolean) => void;
}

export function ClientToggle({ isCompleted, onToggle }: ClientToggleProps) {
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onToggle(e.target.checked);
  };

  return (
    <div className="flex flex-row gap-2 text-sm items-center">
      <p>{t("workflow.tasks.form.completed")}</p>
      <label className="flex cursor-pointer select-none items-center">
        <div className="relative">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={handleChange}
            className="sr-only"
          />
          <div
            className={`block h-8 w-14 rounded-full ${
              isCompleted ? "bg-blue-highlight" : "bg-white-platinum"
            }`}
          ></div>
          <div
            className={`absolute ${
              !isCompleted ? "left-1" : "right-1"
            } top-1 h-6 w-6 rounded-full transition bg-white shadow-sm`}
          ></div>
        </div>
      </label>
    </div>
  );
}
