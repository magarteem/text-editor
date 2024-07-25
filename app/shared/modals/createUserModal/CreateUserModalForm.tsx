import React from "react";
import { FieldEmail, FieldLastName, FieldName } from "./fields/index";
import { Button } from "../../ui";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useCreateUser } from "../../hooks/useCreateUser";
import { useModal } from "../modal/ModalProvider";

interface ICreateUserForm {
  email: string;
  name: string;
  lastName: string;
}

interface CreateUserModalFormProps {
  refetchTable: () => void;
}

export const CreateUserModalForm: React.FC<any> = ({ data }: { data: any }) => {
  const { t } = useTranslation();
  const { createUser, loading } = useCreateUser();
  const { closeModal } = useModal();

  const form = useForm<ICreateUserForm>();

  const onSubmit: SubmitHandler<ICreateUserForm> = async (dataForm) => {
    try {
      const res = await createUser({
        emailAddress: dataForm.email,
        firstName: dataForm.name,
        lastName: dataForm.lastName,
      });
      if (res === "ERR_BAD_REQUEST") {
        form.setError("email", {
          type: "deps",
          message: t("signUp.emailErrExist"),
        });
      } else {
        closeModal();
        setTimeout(() => data.refetchTable(), 500);
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-row justify-between items-center gap-6 mb-2">
            <FieldName form={form} />
            <FieldLastName form={form} />
          </div>
          <FieldEmail form={form} />
          <div className="flex flex-row justify-center gap-6 items-center mt-6">
            <Button type="button" $type="secondary" onClick={closeModal}>
              {t("button.cancel")}
            </Button>
            <Button type="submit" disabled={!!!loading}>
              <p>{t("button.save")}</p>
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
