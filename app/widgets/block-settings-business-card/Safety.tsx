import React, { useState } from "react";
import { Block } from "@/app/features/block/Block";
import { Label } from "../block-user";
import { useTranslation } from "react-i18next";
import { Button } from "@/shared/ui/components/button/Button";
import { useModal } from "@/app/shared/modals/modal/ModalProvider";
import { FieldChangeEmail } from "./ui/FieldChangeEmail";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@clerk/nextjs";

interface Props {
  emailAddress?: string;
}

const styleWrapTable = {
  classNames: "max-w-[692px]",
};

const updateEmailClerkModal = z.object({
  email: z.string().trim().min(1, "storage.formText.emptyErr"),
});
type ValidationSchema = z.infer<typeof updateEmailClerkModal>;

export const Safety = ({ emailAddress }: Props) => {
  const { user } = useUser();
  const { t } = useTranslation();
  const { openModal } = useModal();
  const [editEmail, setEditEmail] = useState(false);

  const form = useForm<ValidationSchema>({
    defaultValues: { email: emailAddress },
    resolver: zodResolver(updateEmailClerkModal),
  });

  const onSubmit = async () => {
    if (user) {
      try {
        const updatedUser = await user.createEmailAddress({
          email: "wwwwssgtestdd@mailto.plus",
        });
        console.log("Email updated successfully:", updatedUser);
      } catch (error) {
        console.error("Error updating email:", error);
      }
    }
  };

  const forgotPassModal = () => {
    openModal("forgotPassModal", {
      ...styleWrapTable,
    });
  };
  const changeEmailModal = () => {
    setEditEmail((prev) => !prev);
  };
  return (
    <Block
      isEditable={false}
      classNames="flex-grow flex-shrink-1 basis-full px-0"
    >
      <div className="px-6 flex flex-col gap-2">
        <Label>{t("settings.safety.email")}</Label>

        {editEmail ? (
          <FieldChangeEmail form={form} />
        ) : (
          <>
            <p className="text-blue-highlight">{emailAddress}</p>
          </>
        )}
        <p className="text-orange-true text-xs flex justify-between">
          {!editEmail && t("settings.safety.changeMail")}
          <div>
            <Button
              onClick={!editEmail ? changeEmailModal : onSubmit}
              $type="primary"
              $size="sm"
              className="text-sm	font-bold"
              disabled={!form.watch("email")}
            >
              {t("settings.safety.buttonPassChange")}
            </Button>
          </div>
        </p>
      </div>
      <div className="px-6 py-4 border-t-2 border-[#EAF0F5] flex flex-col gap-2">
        <Label>{t("settings.safety.password")}</Label>
        <p className="text-black-not-so">********</p>
        <p className="text-orange-true text-xs flex justify-between">
          {t("settings.safety.changePassword")}
          <div>
            <Button
              onClick={forgotPassModal}
              $type="ghost"
              $size="sm"
              className="text-sm	font-bold	"
            >
              {t("settings.safety.buttonPassChange")}
            </Button>
          </div>
        </p>
      </div>
    </Block>
  );
};
