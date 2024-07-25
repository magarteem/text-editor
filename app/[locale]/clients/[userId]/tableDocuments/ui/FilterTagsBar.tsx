import React, { useId, useState, PropsWithChildren } from "react";
import RedCrossIcon from "@/public/svg/red-cross.svg";
import { Tag, Button } from "antd";
import { useTranslation } from "react-i18next";
import {
  useTypeOfDegree,
  useTypeOfService,
} from "@/app/widgets/block-application-details/hooks";
import { useTypeOfClient } from "@/app/shared/hooks/useTypeOfClient";

interface StageStatuses {
  InProgress: string;
  NotStarted: string;
  Completed: string;
  Skipped: string;
}

const defaultTagsToShow = 5;

function CustomTag({ label, form, fieldName, onSubmit }: any) {
  return (
    <Tag
      onClose={() => {}}
      className="flex flex-row items-center gap-1 pl-2 border rounded-lg border-white-platinum m-1 bg-background"
      title={label}
      closeIcon={
        <button
          type="submit"
          onClick={() => {
            if (
              fieldName === "certainStageNumber" ||
              fieldName === "certainStageStatus"
            ) {
              form.resetField("certainStageNumber");
              form.resetField("certainStageStatus");
              form.handleSubmit(onSubmit)();
            } else {
              form.resetField(fieldName);
              form.handleSubmit(onSubmit)();
            }
          }}
        >
          <RedCrossIcon />
        </button>
      }
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "4px",
        paddingLeft: "8px",
        border: "1px solid #DFE1E6",
        borderRadius: "8px",
        fontSize: "14px",
        margin: "2px",
        color: "#626C76",
      }}
    >
      <p className="max-w-96 overflow-hidden text-ellipsis">{label}</p>
    </Tag>
  );
}

export function FilterTagsBar({
  form,
  onSubmit,
  curatorList,
  countriesList,
  admissionCountriesList,
  templateList,
  activeFilters,
}: {
  form: any;
  onSubmit: any;
  curatorList: any;
  countriesList: any;
  admissionCountriesList: any;
  templateList: any;
  activeFilters: any;
}) {
  const { t } = useTranslation();

  const [showAll, setShowAll] = useState(false);

  const handleShowMore = () => {
    setShowAll(true);
  };

  const handleHideExtraTags = () => {
    setShowAll(false);
  };

  const typeOfService = useTypeOfService(
    activeFilters["targetDetailsTypeOfService"]
  );
  const typeOfDegree = useTypeOfDegree(
    activeFilters["targetDetailsPersonDegree"]
  );
  const typeOfClient = useTypeOfClient(activeFilters["typeOfClient"]);

  const countryDict = Object.fromEntries(
    admissionCountriesList.dataSource.map((country: any) => [
      country.value,
      country.label,
    ])
  );

  const stageStatuses = {
    InProgress: t("clients.filters.statuses.InProgress"),
    NotStarted: t("clients.filters.statuses.NotStarted"),
    Completed: t("clients.filters.statuses.Completed"),
    Skipped: t("clients.filters.statuses.Skipped"),
  };

  const tags = Object.keys(activeFilters)
    .map((item: any) => {
      switch (item) {
        case "allStagesCompleted":
          return (
            !!activeFilters[item] && (
              <CustomTag
                form={form}
                fieldName={item}
                onSubmit={onSubmit}
                key={activeFilters[item] + t("clients.filters.сompleted")}
                label={`${t("clients.filters.сompleted")}`}
              />
            )
          );

        case "certainStageStatus":
          return (
            !!activeFilters[item] && (
              <CustomTag
                form={form}
                fieldName={item}
                onSubmit={onSubmit}
                key={activeFilters[item] + t("clients.filters.status")}
                label={`${t("clients.filters.status")}: ${
                  stageStatuses.hasOwnProperty(activeFilters[item])
                    ? stageStatuses[activeFilters[item] as keyof StageStatuses]
                    : ""
                }`}
              />
            )
          );

        case "certainStageNumber":
          return (
            !!activeFilters[item] && (
              <CustomTag
                form={form}
                fieldName={item}
                onSubmit={onSubmit}
                key={activeFilters[item] + t("clients.filters.stage")}
                label={`${t("clients.filters.stage")}: ${activeFilters[item]}`}
              />
            )
          );

        case "workflowTemplateId":
          return (
            !!activeFilters[item] && (
              <CustomTag
                form={form}
                fieldName={item}
                onSubmit={onSubmit}
                key={activeFilters[item] + t("clients.filters.templateUsed")}
                label={`${t("clients.filters.templateUsed")}: ${templateList.dataSource.find((template: any) => template.value === activeFilters[item]).label}`}
              />
            )
          );

        case "countryOfDestination":
          return (
            !!activeFilters[item] &&
            activeFilters[item].length >= 1 && (
              <CustomTag
                form={form}
                fieldName={item}
                onSubmit={onSubmit}
                key={
                  activeFilters[item] +
                  t("widgets.ApplicationDetails.countryOfEntry")
                }
                label={`${t(
                  "widgets.ApplicationDetails.countryOfEntry"
                )}: ${activeFilters[item]
                  .filter((num: any) => countryDict[num])
                  .map((num: any) => countryDict[num])
                  .join(", ")}`}
              />
            )
          );

        case "countryOfResidence":
          return (
            !!activeFilters[item] && (
              <CustomTag
                form={form}
                onSubmit={onSubmit}
                fieldName={item}
                key={
                  activeFilters[item] + t("clients.userForm.countryOfResidence")
                }
                label={`${t("clients.userForm.countryOfResidence")}: ${countriesList.dataSource.find((curator: any) => curator.value === activeFilters[item]).label}`}
              />
            )
          );

        case "curatorId":
          return (
            !!activeFilters[item] && (
              <CustomTag
                form={form}
                onSubmit={onSubmit}
                fieldName={item}
                key={activeFilters[item] + t("clients.filters.curator")}
                label={`${t("clients.filters.curator")}: ${curatorList.dataSource.find((curator: any) => curator.value === activeFilters[item]).label}`}
              />
            )
          );

        case "Other":
          return (
            !!activeFilters[item] && (
              <CustomTag
                form={form}
                onSubmit={onSubmit}
                fieldName={item}
                key={activeFilters[item] + t("clients.filters.examsType.other")}
                label={t("clients.filters.examsType.other")}
              />
            )
          );

        case "hasTopUniversities":
          return (
            !!activeFilters[item] && (
              <CustomTag
                form={form}
                fieldName={item}
                onSubmit={onSubmit}
                key={activeFilters[item] + t("clients.filters.topUniversities")}
                label={`${t("clients.filters.topUniversities")}`}
              />
            )
          );

        case "numberOfUniversities":
          return (
            !!activeFilters[item] && (
              <CustomTag
                form={form}
                fieldName={item}
                onSubmit={onSubmit}
                key={
                  activeFilters[item] +
                  t("widgets.ApplicationDetails.numberOfUniversities")
                }
                label={`${t("widgets.ApplicationDetails.numberOfUniversities")}: ${activeFilters[item]}`}
              />
            )
          );

        case "targetDetailsYear":
          return (
            !!activeFilters[item] && (
              <CustomTag
                form={form}
                fieldName={item}
                onSubmit={onSubmit}
                key={
                  activeFilters[item] +
                  t("widgets.ApplicationDetails.yearOfEnrollment")
                }
                label={`${t("widgets.ApplicationDetails.yearOfEnrollment")}: ${activeFilters[item]}`}
              />
            )
          );

        case "typeOfClient":
          return (
            !!activeFilters[item] && (
              <CustomTag
                form={form}
                fieldName={item}
                onSubmit={onSubmit}
                key={typeOfClient + item}
                label={typeOfClient}
              />
            )
          );

        case "targetDetailsPersonDegree":
          return (
            !!activeFilters[item] && (
              <CustomTag
                form={form}
                fieldName={item}
                onSubmit={onSubmit}
                key={typeOfDegree + item}
                label={typeOfDegree}
              />
            )
          );

        case "targetDetailsTypeOfService":
          return (
            !!activeFilters[item] && (
              <CustomTag
                form={form}
                fieldName={item}
                onSubmit={onSubmit}
                key={typeOfService + item}
                label={typeOfService}
              />
            )
          );
        default:
          return (
            !!activeFilters[item] && (
              <CustomTag
                form={form}
                fieldName={item}
                onSubmit={onSubmit}
                key={item + activeFilters[item]}
                label={item}
              />
            )
          );
      }
    })
    .filter(Boolean);

  const displayedTags = showAll ? tags : tags.slice(0, 5);

  return (
    <div className="mt-3 flex flex-row gap-0.5 max-w-full flex-wrap">
      {displayedTags}
      {!showAll && tags.length > defaultTagsToShow && (
        <Button type="link" onClick={handleShowMore}>
          <p className="text-sm text-blue-highlight font-semibold">
            {t("clients.all")}
          </p>
        </Button>
      )}
      {showAll && tags.length > defaultTagsToShow && (
        <Button type="link" onClick={handleHideExtraTags}>
          <p className="text-sm text-blue-highlight font-semibold">
            {t("clients.hidden")}
          </p>
        </Button>
      )}
    </div>
  );
}
