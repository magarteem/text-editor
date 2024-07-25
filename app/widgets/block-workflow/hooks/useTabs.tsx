import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";
import { Tab } from "@ui/index";
import MethodologyIcon from "@/public/svg/met.svg";
import MaterialsIcon from "@/public/svg/mat.svg";
import TasksIcon from "@/public/svg/tasks.svg";
import CommentIcon from "@/public/svg/comment-icon.svg";

export const useTabs = () => {
  const { t } = useTranslation();
  const [currentTab, setCurrentTab] = useState("methodology");

  const tabs = useMemo<Tab[]>(
    () => [
      {
        key: "methodology",
        label: (
          <div className="flex flex-row gap-1 items-center">
            {currentTab === "methodology" ? (
              <MethodologyIcon className="svg-black_fill" />
            ) : (
              <MethodologyIcon />
            )}
            <p>Методология</p>
          </div>
        ),
      },
      {
        key: "materials",
        label: (
          <div className="flex flex-row gap-1 items-center">
            {currentTab === "materials" ? (
              <MaterialsIcon className="svg-black_fill" />
            ) : (
              <MaterialsIcon />
            )}
            <p>Материалы</p>
          </div>
        ),
      },
      {
        key: "tasks",
        label: (
          <div className="flex flex-row gap-1 items-center">
            {currentTab === "tasks" ? (
              <TasksIcon className="svg-black_fill" />
            ) : (
              <TasksIcon />
            )}
            <p>Задачи для клиента</p>
          </div>
        ),
      },
      {
        key: "comments",
        label: (
          <div className="flex flex-row gap-1 items-center">
            {currentTab === "comments" ? (
              <CommentIcon className="svg-black_fill" />
            ) : (
              <CommentIcon />
            )}
            <p>Комментарии</p>
          </div>
        ),
      },
    ],
    [t, currentTab]
  );

  return { items: tabs, tab: currentTab, setTab: setCurrentTab };
};

export const useClientsTabs = () => {
  const { t } = useTranslation();
  const [currentTab, setCurrentTab] = useState("description");

  const tabs = useMemo<Tab[]>(
    () => [
      {
        key: "description",
        label: (
          <div className="flex flex-row gap-1 items-center">
            {currentTab === "description" ? (
              <MethodologyIcon className="svg-black_fill" />
            ) : (
              <MethodologyIcon />
            )}
            <p>Описание</p>
          </div>
        ),
      },
      {
        key: "materials",
        label: (
          <div className="flex flex-row gap-1 items-center">
            {currentTab === "materials" ? (
              <MaterialsIcon className="svg-black_fill" />
            ) : (
              <MaterialsIcon />
            )}
            <p>Материалы</p>
          </div>
        ),
      },
      {
        key: "tasks",
        label: (
          <div className="flex flex-row gap-1 items-center">
            {currentTab === "tasks" ? (
              <TasksIcon className="svg-black_fill" />
            ) : (
              <TasksIcon />
            )}
            <p>Задачи</p>
          </div>
        ),
      },
    ],
    [t, currentTab]
  );

  return { items: tabs, tab: currentTab, setTab: setCurrentTab };
};
