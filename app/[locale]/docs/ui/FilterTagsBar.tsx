import React, { useState } from "react";
import RedCrossIcon from "@/public/svg/red-cross.svg";
import { Tag, Button } from "antd";
import { useTranslation } from "react-i18next";
import { labels } from "../helpers/libDocType";
import { TypeSelectorType } from "../table/types/typeOfDocument";

interface Props {
  form: any;
  onSubmit: any;
  curatorList: any;
  clientList: any;
  strategistList: any;
  activeFilters: any;
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
  clientList,
  strategistList,
  activeFilters,
}: Props) {
  const { t } = useTranslation();

  const [showAll, setShowAll] = useState(false);

  const handleShowMore = () => {
    setShowAll(true);
  };

  const handleHideExtraTags = () => {
    setShowAll(false);
  };

  const tags = Object.keys(activeFilters)
    .map((item: any) => {
      switch (item) {
        case "curatorId":
          return (
            !!activeFilters[item] && (
              <CustomTag
                form={form}
                onSubmit={onSubmit}
                fieldName={item}
                key={activeFilters[item] + t("clients.filters.curator")}
                label={`${t("clients.filters.curator")}: ${curatorList.data.find((curator: any) => curator.value === activeFilters[item]).label}`}
              />
            )
          );
        case "strategistId":
          return (
            !!activeFilters[item] && (
              <CustomTag
                form={form}
                onSubmit={onSubmit}
                fieldName={item}
                key={
                  activeFilters[item] + t("qa.filters.responsibleStrategist")
                }
                label={`${t("qa.filters.responsibleStrategist")}: ${strategistList.data.find((strateg: any) => strateg.value === activeFilters[item]).label}`}
              />
            )
          );
        case "typeOfClient":
          return (
            !!activeFilters[item] && (
              <CustomTag
                form={form}
                onSubmit={onSubmit}
                fieldName={item}
                key={activeFilters[item] + t("qa.filters.client")}
                label={`${t("qa.filters.client")}: ${clientList.data.find((client: any) => client.value === activeFilters[item]).label}`}
              />
            )
          );
        case "typeOfDocument":
          return (
            !!activeFilters[item] &&
            activeFilters[item].length >= 1 && (
              <CustomTag
                form={form}
                fieldName={item}
                onSubmit={onSubmit}
                key={activeFilters[item] + t("qa.filters.titleFormDocType")}
                label={`${t("qa.filters.titleFormDocType")}: ${activeFilters[
                  item
                ]
                  .map((num: TypeSelectorType) => t(labels[num]))
                  .join(", ")}`}
              />
            )
          );
        default:
          return null;
      }
    })
    .filter(Boolean);

  const displayedTags = showAll ? tags : tags.slice(0, 5);

  if (!Object.keys(activeFilters).length) return null;

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
