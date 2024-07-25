import Calendar from "@/public/svg/calendar.svg";
import CalendarActive from "@/public/svg/calendar-active.svg";
import { ISvgProps } from "./type";

export const CalendarIcon = (props: ISvgProps) => {
  return props.active ? <CalendarActive {...props} /> : <Calendar {...props} />;
};
