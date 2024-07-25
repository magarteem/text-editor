import React from "react";
import { Collapse, ConfigProvider, Tag } from "antd";
import { InfoBlock } from "../block-application-details/ui";
import CheckIcon from "@/public/svg/green.svg";
import { useTranslation } from "react-i18next";
import ChevronIcon from "@/public/svg/chevron-down-big.svg";
import styled from "styled-components";

const CustomCollapse = styled(Collapse)`
  border-radius: 0;
  border: 0;
  .ant-collapse-item {
    border: none;
    border-top: 1px solid #d9d9d9;
  }
  .ant-collapse-content-active,
  .ant-collapse-content {
    border-top: 0;
  }
`;

export const Content = ({ data }: { data: any[] }) => {
  const { t } = useTranslation();

  const grades = [
    {
      label: t("widgets.education.grades.Schoolboy"),
      value: "Schoolboy",
    },
    {
      label: t("widgets.education.grades.CollegeStudent"),
      value: "CollegeStudent",
    },
    {
      label: t("widgets.education.grades.Bachelor"),
      value: "Bachelor",
    },
    {
      label: t("widgets.education.grades.Master"),
      value: "Master",
    },
    {
      label: t("widgets.education.grades.GraduateStudent"),
      value: "GraduateStudent",
    },
  ];

  const renderItem = (item: any) => (
    <div className="flex flex-row items-center justify-between gap-6">
      <div className="flex flex-row gap-4">
        <p className="text-sm font-normal max-w-96 overflow-hidden text-ellipsis whitespace-nowrap">
          {item.educationalInstitution}
        </p>
        <div className="flex flex-row items-center">
          <Tag color="#EAF0F5">
            <p className="font-extrabold text-gray uppercase text-[9px]">GPA</p>
          </Tag>
          <p className="text-sm font-normal max-w-28 overflow-hidden text-ellipsis whitespace-nowrap">
            {item.gpa}
          </p>
        </div>
      </div>
      <div className="flex flex-row gap-4 items-center">
        <p
          className={`text-sm font-normal ${!item.completionMarker ? "mr-10" : ""}`}
        >
          {item.yearOfCompletion}
        </p>
        {item.completionMarker && <CheckIcon />}
      </div>
    </div>
  );

  const renderChildren = (item: any) => (
    <>
      <div>
        <InfoBlock
          title={t("widgets.education.education")}
          isEmpty={!item.educationalInstitution ? true : false}
          text={item.educationalInstitution}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="flex flex-col gap-4">
          <InfoBlock
            title={t("widgets.education.specialization")}
            isEmpty={!item.specialization ? true : false}
            text={item.specialization ? item.specialization : "-"}
          />
          <InfoBlock
            title={t("widgets.education.classNum")}
            isEmpty={!item.classNumber ? true : false}
            text={item.classNumber ? item.classNumber : "-"}
          />
          <InfoBlock
            title={t("widgets.education.graduation")}
            isEmpty={!item.yearOfCompletion ? true : false}
            text={item.yearOfCompletion ? item.yearOfCompletion : "-"}
          />
        </div>
        <div className="flex flex-col gap-4">
          <InfoBlock
            title={t("widgets.education.GPA")}
            isEmpty={!item.gpa ? true : false}
            text={item.gpa ? item.gpa : "-"}
          />
          <InfoBlock
            title={t("widgets.education.grade")}
            isEmpty={
              !grades.find((grade) => grade.value === item.grade)?.label
                ? true
                : false
            }
            text={grades.find((grade) => grade.value === item.grade)?.label}
          />
          <InfoBlock
            title={t("widgets.education.country")}
            isEmpty={!item.country.country ? true : false}
            text={item.country.country ? item.country.country : "-"}
          />
        </div>
      </div>
    </>
  );

  const items = data.map((item) => ({
    label: renderItem(item),
    children: renderChildren(item),
  }));

  return (
    items.length >= 1 && (
      <ConfigProvider
        theme={{ components: { Collapse: { headerBg: "#fff" } } }}
      >
        <CustomCollapse items={items} expandIcon={ChevronIcon} />
      </ConfigProvider>
    )
  );
};
