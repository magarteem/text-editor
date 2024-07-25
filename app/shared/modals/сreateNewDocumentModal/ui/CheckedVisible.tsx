import React from "react";

interface Props {
  isChecked: boolean;
  onChange?: any;
}
export const CheckedVisible = ({ isChecked, onChange }: Props) => {
  return (
    <label className="flex cursor-pointer select-none items-center">
      <div className="relative">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onChange}
          className="sr-only"
        />
        <div
          className={`block h-6 w-11 rounded-full ${isChecked ? "bg-blue-highlight" : "bg-white-platinum"}`}
        ></div>

        <div
          className={`absolute ${!isChecked ? "left-1" : "right-1"} top-1 h-4 w-4 rounded-full transition bg-white shadow-sm`}
        ></div>
      </div>
    </label>
  );
};
