import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Header } from "./ui/Header";
import { IStage } from "@/app/widgets/block-workflow/Workflow-block";
import { Task } from "./Task";
import { AddTask } from "./ui";
import { useStore } from "zustand";
import { useProfileStore } from "@store/profile/index";
import { EditingBlockContext } from "@/app/widgets/editing-block";
import { Empty } from "./ui/Empty";

interface TasksProps {
  stage: IStage;
  setWorkflow: (workflow: any) => void;
  currentStage: IStage;
  setCurrentStage: (stage: IStage) => void;
}

interface TaskFormValues {
  tasks: {
    id: number;
    deadline: number | null;
    shortDescription: string;
    completenessMarker: boolean;
  }[];
}

export const Tasks: React.FC<TasksProps> = React.memo(
  ({ stage, setWorkflow, currentStage, setCurrentStage }) => {
    const profile = useStore(useProfileStore);
    const [newTaskIndexes, setNewTaskIndexes] = useState<number[]>([]);
    const { handleEditBlock } = useContext(EditingBlockContext);

    const { control, reset } = useForm<TaskFormValues>({
      defaultValues: { tasks: stage.tasks },
    });

    const { fields, append, remove } = useFieldArray({
      control,
      name: "tasks",
      keyName: "fieldId",
    });

    useEffect(() => {
      reset({ tasks: stage.tasks });
    }, [stage, reset]);

    const addNewTask = useCallback(() => {
      const newIndex = fields.length;
      append({
        id: newIndex,
        deadline: null,
        shortDescription: "",
        completenessMarker: false,
      });
      setNewTaskIndexes((prev) => [...prev, newIndex]);
    }, [fields.length, append]);

    const removeTask = useCallback(
      (index: number, taskId: number) => {
        remove(index);
        setNewTaskIndexes((prev) => prev.filter((i) => i !== taskId));
        if (!newTaskIndexes.includes(taskId)) {
          const updatedStage = {
            ...currentStage,
            tasks: currentStage.tasks.filter((task: any) => task.id !== taskId),
          };
          setCurrentStage(updatedStage);
          setWorkflow((prevWorkflow: any) => ({
            ...prevWorkflow,
            stages: prevWorkflow.stages.map((stage: any) =>
              stage.id === currentStage.id ? updatedStage : stage
            ),
          }));
        }
      },
      [remove, newTaskIndexes, currentStage, setCurrentStage, setWorkflow]
    );

    const isDisabled = useMemo(() => !!newTaskIndexes.length, [newTaskIndexes]);

    return (
      <div className={`${profile?.roleType === "Client" ? "mb-6" : ""}`}>
        {profile?.roleType !== "Client" && (
          <Header
            addHandler={addNewTask}
            disable={isDisabled}
            role={profile?.roleType || "Client"}
          />
        )}
        <div
          className={`${profile?.roleType === "Client" ? "" : "mt-4"} flex flex-col gap-4`}
        >
          {fields.map((task, index) => (
            <Task
              key={task.fieldId}
              task={task}
              index={index}
              remove={() => removeTask(index, task.id)}
              newTaskIndexes={newTaskIndexes}
              setNewTaskIndexes={setNewTaskIndexes}
              currStage={currentStage}
              setWorkflow={setWorkflow}
              setCurrentStage={setCurrentStage}
            />
          ))}
          {profile?.roleType === "Client" && fields.length === 0 && <Empty />}
        </div>
        {profile?.roleType !== "Client" && (
          <AddTask addHandler={addNewTask} disable={isDisabled} />
        )}
      </div>
    );
  }
);
