import Dayjs from "dayjs";
import relativeTIme from "dayjs/plugin/relativeTime";
import isToday from "dayjs/plugin/isToday";
import "dayjs/locale/ru";
import "dayjs/locale/en";

Dayjs.extend(relativeTIme);
Dayjs.extend(isToday);
const localeTimeSeparators: { [key: string]: string } = {
  en: "at",
  ru: "в",
};
const localeTimeToday: { [key: string]: string } = {
  en: "Today",
  ru: "Сегодня",
};
const localeTimeYesterday: { [key: string]: string } = {
  en: "Today",
  ru: "Сегодня",
};

const setDayjsLocale = (locale: string) => {
  Dayjs.locale(locale);
};

export const dateDeclension = (
  date: number,
  locale: string,
  typeFormat?: string
): string => {
  setDayjsLocale(locale);

  let newDate = new Date();
  newDate.setDate(newDate.getDate() - 2);
  newDate.setHours(0, 0, 0, 0);

  const timeSeparator = localeTimeSeparators[locale] || "at";
  const today = localeTimeToday[locale] || "at";
  const yesterday = localeTimeYesterday[locale] || "at";
  const format = typeFormat ?? `D MMMM YYYY [${timeSeparator}] HH:mm`;
  const renderDate =
    newDate.getTime() > date
      ? `${Dayjs(date).format(format)}`
      : `${
          Dayjs(date).isToday() ? today : yesterday
        }, ${Dayjs(date).format("HH:mm")}`;

  return renderDate;
};
