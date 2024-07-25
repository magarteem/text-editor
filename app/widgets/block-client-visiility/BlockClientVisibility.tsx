import React, { useContext, useEffect } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { Block } from "@/app/features/block/Block";
import { IStage } from "../block-workflow/Workflow-block";
import { Workflow } from "@/app/shared/hooks/useGetWorkflow";
import {
  DeadlineCalendar,
  FiledEditStageName,
  StatusSwitch,
  VisibilityToggle,
  Footer,
} from "./components";
import { useTranslation } from "react-i18next";
import { GetProfileResponse } from "@/app/shared";
import BigPenIcon from "@/public/svg/big-pen.svg";
import { EditingBlockContext } from "../editing-block";
import { Loader } from "@/app/sign-in/[[...sign-in]]/ui";
import { useProfileStore } from "@/app/shared/store/profile/useProfileStore";
import { usePatchStage } from "@/app/shared/hooks/usePatchStage";
import StopIcon from "@/public/svg/stop-icon.svg";
import { useStore } from "zustand";

const getOrderNumber = (items: IStage[] | null, selectedId: number | null) => {
  if (!items || selectedId == null) return -1;

  let orderNumber = 0;
  for (let i = 0; i < items.length; i++) {
    if (items[i].status !== "Skipped") orderNumber++;
    if (items[i].id === selectedId) return orderNumber;
  }

  return -1;
};

const useFormMethods = (currentStage: IStage) => {
  const form = useForm<any>({
    defaultValues: {
      visibilityToTheClient: currentStage?.visibilityToTheClient,
      deadlineStage: currentStage?.deadlineStage,
      status: currentStage?.status,
      name: currentStage?.name,
    },
  });

  useEffect(() => {
    form.reset({
      visibilityToTheClient: currentStage?.visibilityToTheClient,
      deadlineStage: currentStage?.deadlineStage,
      status: currentStage?.status,
      name: currentStage?.name,
    });
  }, [currentStage, form]);

  return form;
};

export function BlockClientVisibility({
  id,
  workflow,
  profile,
  currentStage,
  setWorkflow,
  setCurrentStage,
}: {
  id: string;
  workflow: Workflow;
  profile: GetProfileResponse;
  setWorkflow: (workflow: any) => void;
  setCurrentStage: any;
  currentStage: IStage;
}) {
  const { t } = useTranslation();
  const { patchStage, loading } = usePatchStage();
  const user = useStore(useProfileStore);
  const form = useFormMethods(currentStage);

  const { editingBlockId, handleEditBlock, handleCancelEdit } =
    useContext(EditingBlockContext);
  const isEditing = editingBlockId === id;

  const handleEdit = () => handleEditBlock(id);
  const handleCancel = () => handleCancelEdit();

  const currStageSerialNum = getOrderNumber(workflow.stages, currentStage.id);

  const onSubmit = async (data: any) => {
    const visibility =
      data.status === "Skipped" ? false : data.visibilityToTheClient;
    await patchStage({
      stageId: currentStage.id,
      deadline: data.deadlineStage,
      ...data,
      visibilityToTheClient: visibility,
    });
    setCurrentStage((prev: IStage) => ({ ...prev, ...data }));
    setWorkflow((prev: any) => ({
      ...prev,
      stages: prev.stages.map((stage: IStage) =>
        stage.id === currentStage.id ? { ...stage, ...data } : stage
      ),
    }));
    handleCancel();
  };

  const handleReset = () => {
    handleCancel();
    form.reset();
  };

  const status = useWatch({
    control: form.control,
    name: "status",
  });

  if (!currentStage) {
    return (
      <Block
        isEditable={false}
        classNames="flex justify-center items-center w-full"
      >
        <Loader />
      </Block>
    );
  }

  return (
    <Block
      isEditable={false}
      classNames={`${user?.roleType !== "Client" ? "pb-12" : ""}`}
    >
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex justify-between text-xl">
            <div className="flex gap-2 items-center w-full">
              {currentStage.status !== "Skipped" ? (
                <h3 className="font-normal text-gray">
                  {t("workflow.visibilityClient.stage")}&nbsp;
                  {currStageSerialNum}
                </h3>
              ) : (
                <StopIcon />
              )}
              {isEditing ? (
                <FiledEditStageName form={form} />
              ) : (
                <h3 className="font-semibold max-w-xl overflow-hidden text-ellipsis">
                  {currentStage?.name}
                </h3>
              )}
            </div>
            {user?.roleType === "Administrator" && !!!editingBlockId && (
              <button onClick={handleEdit}>
                <BigPenIcon />
              </button>
            )}
          </div>
          {user?.roleType !== "Client" && (
            <div className="flex justify-between items-center mt-6 gap-2">
              <>
                <StatusSwitch
                  stage={currentStage}
                  isEditing={true}
                  form={form}
                />
                {status !== "Skipped" && (
                  <>
                    <DeadlineCalendar
                      profile={profile}
                      currentStage={currentStage}
                      stages={workflow.stages}
                      isEditing={true}
                      control={form.control}
                    />
                    <VisibilityToggle
                      form={form}
                      stage={currentStage}
                      isEditing={isEditing}
                      currStageSerialNum={currStageSerialNum}
                    />
                  </>
                )}
              </>
            </div>
          )}
          {(form.formState.isDirty || isEditing) && (
            <Footer disable={loading} handleCancel={handleReset} />
          )}
        </form>
      </FormProvider>
    </Block>
  );
}
