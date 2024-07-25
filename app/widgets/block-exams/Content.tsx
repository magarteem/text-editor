import React, { useTransition } from "react";
import { ConfigProvider, List } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

export function Content({ data }: { data: any[] }) {
  const { t } = useTranslation();

  const grades = [
    { label: "TOEFL", value: "TOEFL" },
    { label: "IELTS", value: "IELTS" },
    { label: "SAT", value: "SAT" },
    { label: "GMAT", value: "GMAT" },
    { label: "GRE", value: "GRE" },
    { label: t("widgets.exams.other"), value: "Other" },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorSplit: "#fff",
        },
      }}
    >
      <List
        className="flex flex-col gap-4"
        dataSource={data}
        style={{
          gap: "16px",
        }}
        renderItem={(item, index) => {
          const date = item.examDay
            ? dayjs(item.examDay).format("DD.MM.YYYY")
            : "";
          return (
            <List.Item
              className="border-t border-gray border-opacity-20"
              style={{ padding: 0 }}
            >
              <div className="px-6 py-2 flex flex-row w-full">
                <p className="font-semibold text-gray pr-2">{index + 1}</p>
                <span className="font-normal pr-6">
                  {grades.find((grade) => grade.value == item.grade)?.label}
                </span>
                <span
                  className="font-normal w-full text-start pr-6 whitespace-nowrap overflow-hidden text-ellipsis"
                  title={item.result}
                >
                  {item.result}
                </span>
                <span>{date.toString()}</span>
              </div>
            </List.Item>
          );
        }}
      ></List>
    </ConfigProvider>
  );
}
