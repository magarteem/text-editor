import React, { forwardRef, ReactNode } from "react";
import {
  DatePicker as AntdDatePicker,
  Input,
  InputProps,
  InputRef,
} from "antd";
import { DatePickerProps } from "antd/es/date-picker";
import DatePickerIcon from "@/public/svg/datepicker-suffix.svg";

type Props = {
  chip?: ReactNode;
  input?: InputProps;
} & DatePickerProps;

export const DatePicker = ({ input, chip, ...datepickerProps }: Props) => {
  return (
    <AntdDatePicker
      style={{
        borderRadius: 12,
        fontSize: "14px !important",
        display: "flex",
      }}
      suffixIcon={<DatePickerIcon />}
      className="borderedSelect"
      components={{
        input: forwardRef<InputRef, InputProps>((props, ref) => (
          <>
            <Input
              style={{ fontSize: 14, fontWeight: 500 }}
              {...props}
              ref={ref}
            />
            {chip}
          </>
        )),
      }}
      {...datepickerProps}
    />
  );
};
