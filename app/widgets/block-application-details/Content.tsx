"use client";

import { useTranslation } from "react-i18next";
import { InfoBlock } from "./ui/InfoBlock";
import { useTypeOfDegree, useTypeOfService } from "./hooks/index";
import { Props } from "../block-user";

export function Content({ profile }: Props) {
  const { t } = useTranslation();

  const {
    targetDetailsStartDate,
    targetDetailsEndDate,
    targetDetailsCountryForAdmission,
    targetDetailsTypeOfService,
    targetDetailsPersonDegree,
    targetDetailsNumberOfTopUniversities,
    targetDetailsYear,
    targetDetailsProgram,
    targetDetailsNumberOfUniversities,
  } = profile;

  const targetCountry =
    targetDetailsCountryForAdmission.length === 1
      ? targetDetailsCountryForAdmission.map((obj: any) => obj.country)[0]
      : targetDetailsCountryForAdmission.length === 0
        ? "-"
        : targetDetailsCountryForAdmission
            .map((obj: any) => obj.country)
            .join(", ");

  const startDate = targetDetailsStartDate
    ? new Date(targetDetailsStartDate)
    : null;
  const endDate = targetDetailsEndDate ? new Date(targetDetailsEndDate) : null;

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-4">
        <InfoBlock
          title={t("widgets.ApplicationDetails.typeOfService")}
          isEmpty={!targetDetailsTypeOfService ? true : false}
          text={useTypeOfService(
            targetDetailsTypeOfService ? targetDetailsTypeOfService : ""
          )}
        />
        <InfoBlock
          title={t("widgets.ApplicationDetails.countryOfEntry")}
          isEmpty={targetCountry === "-" ? true : false}
          text={targetCountry}
        />
        <InfoBlock
          title={t("widgets.ApplicationDetails.degree")}
          isEmpty={!targetDetailsPersonDegree ? true : false}
          text={useTypeOfDegree(
            targetDetailsPersonDegree ? targetDetailsPersonDegree : ""
          )}
        />
        <InfoBlock
          title={t("widgets.ApplicationDetails.numberOfTopUniversities")}
          isEmpty={!targetDetailsNumberOfTopUniversities ? true : false}
          text={
            !!!targetDetailsNumberOfTopUniversities
              ? "-"
              : targetDetailsNumberOfTopUniversities?.toString()
          }
        />
      </div>
      <div className="flex flex-col gap-4">
        <InfoBlock
          title={t("widgets.ApplicationDetails.periodOfCooperation")}
          isEmpty={!startDate && !endDate ? true : false}
          text={
            startDate || endDate
              ? `${
                  !!startDate
                    ? startDate.toLocaleDateString("ru-RU", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    : t("clients.table.defaultValues.country")
                }-${
                  !!endDate
                    ? endDate.toLocaleDateString("ru-RU", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    : t("clients.table.defaultValues.country")
                }`
              : "-"
          }
        />
        <InfoBlock
          title={t("widgets.ApplicationDetails.yearOfEnrollment")}
          isEmpty={!targetDetailsYear && !endDate ? true : false}
          text={targetDetailsYear ? targetDetailsYear?.toString() : "-"}
        />
        <InfoBlock
          title={t("widgets.ApplicationDetails.program")}
          isEmpty={!targetDetailsProgram && !endDate ? true : false}
          text={targetDetailsProgram ? targetDetailsProgram?.toString() : "-"}
        />
        <InfoBlock
          title={t("widgets.ApplicationDetails.numberOfUniversities")}
          isEmpty={
            !targetDetailsNumberOfUniversities && !endDate ? true : false
          }
          text={
            !!!targetDetailsNumberOfUniversities
              ? "-"
              : targetDetailsNumberOfUniversities.toString()
          }
        />
      </div>
    </div>
  );
}
