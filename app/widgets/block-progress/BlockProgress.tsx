import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Progress as ProgressBar } from "antd";
import { Block } from "@/app/features/block/Block";
import { CompletedTasksTag } from "@ui/index";
import { Loader } from "@/app/sign-in/[[...sign-in]]/ui";
import { GetProfileResponse } from "@api/index";
import RocketImage from "@/public/svg/rocket.svg";
import RefFlagIcon from "@/public/svg/redFlag.svg";
import OrangeFlagIcon from "@/public/svg/orangeFlag.svg";

interface Props {
  profile: GetProfileResponse;
  loading: boolean;
  workflow: any;
}

const statuses = new Set(["Completed", "Skipped"]);

export const BlockProgress: React.FC<Props> = ({
  profile,
  workflow,
  loading,
}) => {
  const { t } = useTranslation();
  const { caseStatusProgress } = profile;

  const activeStages = useMemo(() => {
    if (!workflow) return [];
    return workflow.stages.filter(
      (item: any) => !statuses.has(item.status) && item.visibilityToTheClient
    );
  }, [workflow]);

  return (
    <Block isEditable={false} id={profile.id.toString()}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center gap-2">
          <RocketImage />
          <h1 className="text-gray text-sm font-bold">
            {t("widgets.progress.title")}
          </h1>
        </div>
        {caseStatusProgress.total ? (
          <>
            <div className="flex flex-row gap-2 items-center">
              {!!caseStatusProgress.total && (
                <CompletedTasksTag
                  total={caseStatusProgress.total}
                  completed={caseStatusProgress.completed}
                />
              )}
              <div className="overflow-clip rounded-full h-3 bg-white flex items-center justify-center w-full">
                <ProgressBar
                  steps={caseStatusProgress.total}
                  showInfo={false}
                  className="w-full"
                  strokeColor={"#4A7ADC"}
                  trailColor={"#C3DDF0"}
                  percent={Math.round(
                    (100 / caseStatusProgress.total) *
                      caseStatusProgress.completed
                  )}
                />
              </div>
            </div>
            {loading ? (
              <div className="flex items-center justify-center">
                <Loader />
              </div>
            ) : (
              !!workflow &&
              activeStages.length > 0 && (
                <div>
                  <h3 className="text-sm text-gray font-semibold">
                    {t("widgets.progress.active")}
                  </h3>
                  {activeStages.map((item: any) => (
                    <div className="flex flex-col gap-2 mt-2" key={item.id}>
                      <div
                        className="bg-gray-bright pl-2 rounded-md flex flex-row items-center justify-between"
                        title={item.name}
                      >
                        <p className="text-sm font-normal whitespace-nowrap overflow-hidden text-ellipsis max-w-44">
                          {`${item.order}. ${item.name}`}
                        </p>
                        {item.redStage && (
                          <RefFlagIcon className={"mr-2 ml-1"} />
                        )}
                        {item.orangeStage && (
                          <OrangeFlagIcon className={"mx-2"} />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </>
        ) : (
          <p className="text-sm font-normal">
            {t("widgets.progress.noneClient")}
          </p>
        )}
      </div>
    </Block>
  );
};
