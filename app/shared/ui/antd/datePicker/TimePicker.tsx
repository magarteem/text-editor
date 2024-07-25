import { TimePicker as AntdTimePicker, TimePickerProps } from "antd";
import TimePickerIcon from "@/public/svg/timepicker-suffix.svg";

export const TimePicker = (datepickerProps: TimePickerProps) => {
  return (
    <AntdTimePicker
      format="HH:mm"
      use12Hours={false}
      suffixIcon={<TimePickerIcon />}
      className="borderedSelect rounded-xl text-sm flex"
      {...datepickerProps}
    />
  );
};
