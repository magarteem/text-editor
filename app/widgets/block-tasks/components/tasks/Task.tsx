import React, { useState, useEffect, useContext, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Tag } from "antd";
import TrashIcon from "@/public/svg/trash-icon.svg";
import BigPenIcon from "@/public/svg/big-pen.svg";
import DangerIcon from "@/public/svg/danger-icon.svg";
import SuccessIcon from "@/public/svg/succsess-icon.svg";
import { Block } from "@/app/features/block/Block";
import { Form } from "./form/Form";
import { useForm } from "react-hook-form";
import { usePatchTask } from "@hooks/usePatchTask";
import { useCreateTask } from "@hooks/useCreateTask";
import { useRemoveTask } from "@hooks/useRemoveTask";
import { IStage } from "@/app/widgets/block-workflow/Workflow-block";
import { useStore } from "zustand";
import { useProfileStore } from "@store/profile/index";
import { EditingBlockContext } from "@/app/widgets/editing-block";
import { ClientToggle } from "./ui/ClientToggle";

interface TaskProps {
  task: any;
  index: number;
  remove: () => void;
  newTaskIndexes: number[];
  setNewTaskIndexes: React.Dispatch<React.SetStateAction<number[]>>;
  currStage: IStage;
  setWorkflow: (workflow: any) => void;
  setCurrentStage: (stage: IStage) => void;
}

interface DateTagProps {
  date: string;
  isDeadline: boolean;
  completenessMarker: boolean;
}
interface CompleteTagProps {
  completenessMarker: boolean;
  isDeadline: boolean;
}

const DateTag: React.FC<DateTagProps> = React.memo(
  ({ date, isDeadline, completenessMarker }) => (
    <Tag
      color={isDeadline && !completenessMarker ? "#FEE2E2" : "#F3F7FA"}
      className="flex flex-row gap-1 items-center"
    >
      <p
        className={`${isDeadline && !completenessMarker ? "text-red" : "text-gray"} font-bold text-xs`}
      >
        {date}
      </p>
    </Tag>
  )
);

const CompleteTag: React.FC<CompleteTagProps> = React.memo(
  ({ completenessMarker, isDeadline }) =>
    completenessMarker ? (
      <SuccessIcon />
    ) : isDeadline ? (
      <div className="relative">
        <p className="text-xs text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          !
        </p>
        <DangerIcon />
      </div>
    ) : null
);

const isDeadlineEnd = (deadline: number): boolean => deadline <= Date.now();

export const Task: React.FC<TaskProps> = ({
  task,
  index,
  remove,
  newTaskIndexes,
  setNewTaskIndexes,
  setWorkflow,
  setCurrentStage,
  currStage,
}) => {
  const { t } = useTranslation();
  const [isBgHighlight, setIsBgHighlight] = useState(false);
  const id = `workflow-task-edit${index}${task.id}`;
  const { editingBlockId, handleEditBlock, handleCancelEdit } =
    useContext(EditingBlockContext);
  const isEditing = editingBlockId === id;
  const profile = useStore(useProfileStore);

  const taskForm = useForm({
    defaultValues: {
      deadline: task.deadline,
      completenessMarker: task.completenessMarker,
      shortDescription: task.shortDescription,
    },
  });

  const { patchTask, loading: loadingPatch } = usePatchTask();
  const { createTask, loadingCreate } = useCreateTask();
  const { removeTask } = useRemoveTask();

  useEffect(() => {
    if (!task.shortDescription) handleEditBlock(id);
  }, [task.shortDescription, handleEditBlock, id]);

  useEffect(() => {
    taskForm.reset({
      deadline: task.deadline,
      completenessMarker: task.completenessMarker,
      shortDescription: task.shortDescription,
    });
  }, [task, taskForm]);

  useEffect(() => {
    if (isEditing) setIsBgHighlight(false);
  }, [isEditing]);

  const handleEditGlobal = useCallback(
    () => handleEditBlock(id),
    [handleEditBlock, id]
  );
  const handleCancelGlobal = useCallback(
    () => handleCancelEdit(),
    [handleCancelEdit]
  );

  const handleCancel = useCallback(() => {
    if (newTaskIndexes.includes(task.id)) {
      remove();
      handleCancelGlobal();
    } else {
      handleCancelGlobal();
    }
    taskForm.reset({
      deadline: task.deadline,
      completenessMarker: task.completenessMarker,
      shortDescription: task.shortDescription,
    });
  }, [newTaskIndexes, task.id, remove, handleCancelGlobal]);

  const handleRemoveTask = useCallback(async () => {
    try {
      await removeTask({ taskId: task.id });
      remove();
    } catch (err) {
      console.error(err);
    }
  }, [removeTask, task.id, remove]);

  const handleCreateTask = useCallback(
    async (data: any) => {
      const newTask = await createTask({ stageId: currStage.id, ...data });
      const updatedStage: IStage = {
        ...currStage,
        tasks: [...currStage.tasks, newTask],
      };
      setCurrentStage(updatedStage);
      setWorkflow((prevWorkflow: any) => ({
        ...prevWorkflow,
        stages: prevWorkflow.stages.map((stage: any) =>
          stage.id === currStage.id ? updatedStage : stage
        ),
      }));
    },
    [createTask, currStage, setCurrentStage, setWorkflow]
  );

  const handleUpdateTask = useCallback(
    async (data: any) => {
      await patchTask({ ...data, id: task.id });
      const updatedStage: IStage = {
        ...currStage,
        tasks: currStage.tasks.map((t: any) =>
          t.id === task.id ? { ...t, ...data } : t
        ),
      };
      setCurrentStage(updatedStage);
      setWorkflow((prevWorkflow: any) => ({
        ...prevWorkflow,
        stages: prevWorkflow.stages.map((stage: any) =>
          stage.id === currStage.id ? updatedStage : stage
        ),
      }));
    },
    [patchTask, task.id, currStage, setCurrentStage, setWorkflow]
  );

  const handleToggleComplete = useCallback(
    (completenessMarker: boolean) => {
      handleUpdateTask({ completenessMarker });
    },
    [handleUpdateTask]
  );

  const onSubmit = useCallback(
    async (data: any) => {
      try {
        if (newTaskIndexes.includes(task.id)) {
          await handleCreateTask(data);
          setNewTaskIndexes((prev) => prev.filter((i) => i !== task.id));
        } else {
          await handleUpdateTask(data);
        }
        handleCancel();
        setIsBgHighlight(false);
      } catch (err) {
        console.error(err);
        handleCancel();
        setIsBgHighlight(false);
      }
    },
    [
      newTaskIndexes,
      task.id,
      handleCreateTask,
      handleUpdateTask,
      handleCancel,
      setNewTaskIndexes,
    ]
  );

  const deadlinePassed = task.deadline !== 0 && isDeadlineEnd(task.deadline);
  const formattedDate = new Date(task.deadline).toLocaleDateString();

  return (
    <Block
      isEditable={false}
      style={{
        background:
          !isEditing && deadlinePassed && !task.completenessMarker
            ? "#FFEFF0"
            : "",
      }}
    >
      {isEditing ? (
        <Form
          index={index}
          form={taskForm}
          cancel={handleCancel}
          onSubmit={taskForm.handleSubmit(onSubmit)}
          loading={loadingPatch || loadingCreate.current}
          disable={!!newTaskIndexes.length}
        />
      ) : (
        <>
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-2">
              <p className="font-semibold text-gray">
                <span>{t("workflow.tasks.tasks.item")}</span>&nbsp;
                <span>{index + 1}</span>
              </p>
              {task.deadline !== 0 && (
                <DateTag
                  date={formattedDate}
                  isDeadline={deadlinePassed}
                  completenessMarker={task.completenessMarker}
                />
              )}
              <CompleteTag
                isDeadline={deadlinePassed}
                completenessMarker={task.completenessMarker}
              />
            </div>
            {profile?.roleType === "Client" && (
              <ClientToggle
                isCompleted={task.completenessMarker}
                onToggle={handleToggleComplete}
              />
            )}
            {profile?.roleType !== "Client" && editingBlockId === null && (
              <div className="flex flex-row items-center gap-3">
                <button onClick={handleEditGlobal}>
                  <BigPenIcon />
                </button>
                <button onClick={handleRemoveTask}>
                  <TrashIcon />
                </button>
              </div>
            )}
          </div>
          <p
            className={`text-sm ${task.completenessMarker ? "text-grey-light" : ""}`}
          >
            {task.shortDescription}
          </p>
        </>
      )}
    </Block>
  );
};
