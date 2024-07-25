import { Button } from "../../ui";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FieldNameDirectory } from "./fields/FieldNameDirectory";
import { useModal } from "../modal/ModalProvider";
import { FieldVisibleDirectory } from "./fields/FieldVisibleDirectory";
import { useParams } from "next/navigation";
import AddSquare from "@/public/svg/add-square.svg";
import { useQueryStorageMethods } from "../../hooks/useQueryStorageMethods";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { ForgotPasswordForm } from "@/app/sign-in/[[...sign-in]]/forgot-pass-form";
import { useUser } from "@clerk/nextjs";

interface ModalProps {
  parentId: number;
}

const forgotPassModal = z.object({
  directory: z
    .string({ required_error: "storage.formText.emptyErr" })
    .min(1, "storage.formText.emptyErr")
    .max(32, "storage.formText.maxCharacters"),
  visible: z.boolean(),
});
export type ValidationSchema = z.infer<typeof forgotPassModal>;

export function ForgotPassModal({ data }: { data: ModalProps }) {
  const [pendingUpload, setPendingUpload] = useState(false);
  const { t } = useTranslation();
  const { closeModal } = useModal();
  const { userId }: { userId: string } = useParams();
  const { createDirectory } = useQueryStorageMethods();
  const [email, setEmail] = useState("ssgtest@mailto.plus");
  const [anotherType, setAnotherType] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [stepOneFlag, setStepOneFlag] = useState(false);
  const [timer, setTimer] = useState(30);
  const [activeSignIn, setActiveSignIn] = useState<any>();
  const form = useForm<ValidationSchema>({
    defaultValues: { directory: "", visible: false },
    resolver: zodResolver(forgotPassModal),
  });

  const onSubmit = async (dataForm: ValidationSchema) => {
    setPendingUpload(true);

    const dir = {
      parentId: 22,
      ownerId: userId,
      name: dataForm.directory,
      visible: dataForm.visible,
    };

    createDirectory.mutate(dir, {
      onSuccess() {
        closeModal();
      },
      onError() {
        setPendingUpload(false);
      },
    });
  };

  const forgotPasswordHandler = () => {
    setIsForgotPassword((prev) => !prev);
  };

  const handleBack = () => {
    isForgotPassword
      ? forgotPasswordHandler()
      : anotherType
        ? setAnotherType(false)
        : setStepOneFlag(false);
  };

  return (
    <ForgotPasswordForm
      email={email}
      otp={anotherType}
      anotherTypeHandler={handleBack}
      timer={timer}
      setTimer={setTimer}
      activeSignIn={activeSignIn}
      closeModal={closeModal}
    />
  );
}
