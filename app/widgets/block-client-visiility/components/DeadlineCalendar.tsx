import React, { useMemo, useEffect, useState } from "react";
import { DatePicker } from "@ui/index";
import { useTranslation } from "react-i18next";
import { IStage } from "../../block-workflow/Workflow-block";
import { GetProfileResponse } from "@/app/shared";
import { useController, Control } from "react-hook-form";
import { useStore } from "zustand";
import { useProfileStore } from "@store/index";
import dayjs, { Dayjs } from "dayjs";

interface CalculateTotalDaysProps {
  stages: IStage[];
  currentStageId: number;
}

const calculateTotalDays = ({
  stages,
  currentStageId,
}: CalculateTotalDaysProps): number => {
  let total = 0;
  for (const stage of stages) {
    if (stage.status !== "Skipped") {
      total += stage.durationInDays;
      if (stage.id === currentStageId) {
        break;
      }
    }
  }
  return total;
};

const getDayWord = (number: number, t: (key: string) => string): string => {
  const absNumber = Math.abs(number);
  const lastDigit = absNumber % 10;
  const lastTwoDigits = absNumber % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return t("workflow.visibilityClient.days");
  } else if (lastDigit === 1) {
    return t("workflow.visibilityClient.dayOne");
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return t("workflow.visibilityClient.day");
  } else {
    return t("workflow.visibilityClient.days");
  }
};

interface DeadlineCalendarProps {
  stages: IStage[] | null;
  profile: GetProfileResponse;
  isEditing: boolean;
  currentStage: IStage;
  control: Control<any>;
}

export function DeadlineCalendar({
  stages,
  profile,
  isEditing,
  currentStage,
  control,
}: DeadlineCalendarProps) {
  const { t } = useTranslation();
  const user = useStore(useProfileStore);
  const { field } = useController({ name: "deadlineStage", control });
  const [actualDays, setActualDays] = useState<number>(
    currentStage.durationInDays
  );

  const startDate = useMemo(
    () => dayjs(profile.targetDetailsStartDate),
    [profile.targetDetailsStartDate]
  );
  const currentDate = useMemo(() => dayjs(), []);
  const deadlineDate = useMemo(
    () => (field.value ? dayjs(field.value) : null),
    [field.value]
  );

  const totalDays = useMemo(
    () =>
      stages
        ? calculateTotalDays({ stages, currentStageId: currentStage.id })
        : 0,
    [stages, currentStage.id]
  );
  const recommendedEndDate = useMemo(
    () => startDate.add(totalDays, "day"),
    [startDate, totalDays]
  );

  const { daysRemaining, isOverdue, isNearDeadline, isDeadlineToday } =
    useMemo(() => {
      if (!deadlineDate)
        return {
          daysRemaining: 0,
          isOverdue: false,
          isNearDeadline: false,
          isDeadlineToday: false,
        };
      const daysRemaining = deadlineDate.diff(currentDate, "day");
      return {
        daysRemaining,
        isOverdue: daysRemaining < 0,
        isNearDeadline: daysRemaining + 1 > 0 && 2 >= daysRemaining + 1,
        isDeadlineToday:
          deadlineDate.format("DD/MM/YYYY") ===
          currentDate.format("DD/MM/YYYY"),
      };
    }, [deadlineDate, currentDate]);

  const deadlineInfo = useMemo(() => {
    if (isOverdue) {
      return (
        <div className="text-sm font-semibold text-red-500 bg-red text-white rounded-lg px-2 py-1">
          -{Math.abs(daysRemaining)} {getDayWord(daysRemaining, t)}
        </div>
      );
    }
    if (isNearDeadline && !isDeadlineToday) {
      return (
        <div className="text-sm font-semibold bg-yellow-deep text-yellow-deep-light rounded-lg px-2 py-1">
          {daysRemaining + 1} {getDayWord(daysRemaining + 1, t)}
        </div>
      );
    }
    return null;
  }, [isOverdue, isNearDeadline, isDeadlineToday, daysRemaining, t]);

  const getActualDays = useMemo(() => {
    return currentStage.durationInDays;
  }, [currentStage.status, currentStage.endDate, currentStage.durationInDays]);

  useEffect(() => {
    setActualDays(getActualDays);
  }, [getActualDays]);

  if (!currentStage || !stages || stages.length === 0 || !profile) return null;

  return (
    <div className="flex flex-col gap-3 max-w-72 flex-1">
      <div className="flex flex-row gap-2 items-center">
        <h3 className="text-sm font-semibold text-gray">
          {t("workflow.visibilityClient.deadline")}
        </h3>
        {currentStage.status !== "Completed" && deadlineInfo}
      </div>
      <div className="h-12 relative">
        <DatePicker
          disabled={!isEditing}
          className="h-12 rounded-2xl"
          value={deadlineDate}
          minDate={dayjs("01.01.1900", "DD.MM.YYYY")}
          format={"DD.MM.YYYY"}
          placeholder={t("workflow.visibilityClient.recomendedDatePlaceholder")}
          onChange={(date: Dayjs | null) => {
            field.onChange(date ? date.unix() * 1000 : null);
          }}
        />
        {profile.targetDetailsStartDate &&
          currentStage.status === "Completed" &&
          user?.roleType !== "Curator" && (
            <span className="absolute text-xs text-gray font-normal -bottom-6 left-0 text-nowrap">
              {dayjs(currentStage.endDate).format("DD.MM.YYYY")}&nbsp;
              {t("workflow.visibilityClient.endDate")}
              &nbsp;
              <span
                className={`font-semibold ${Math.floor(currentStage.actualDuration) > actualDays ? "text-red" : ""}`}
              >
                ({Math.floor(currentStage.actualDuration)}&nbsp;
                {getDayWord(Math.floor(currentStage.actualDuration), t)})
              </span>
            </span>
          )}
        {profile.targetDetailsStartDate && (
          <span
            className={`absolute text-xs text-gray font-normal ${currentStage.status === "Completed" && profile.roleType !== "Curator" ? "-bottom-10" : "-bottom-6"} left-0 text-nowrap`}
          >
            {recommendedEndDate.format("DD.MM.YYYY")}&nbsp;
            {t("workflow.visibilityClient.recomendedDate")}
            &nbsp;
            <span className="font-semibold">
              ({actualDays}&nbsp;
              {getDayWord(actualDays, t)})
            </span>
          </span>
        )}
      </div>
    </div>
  );
}
