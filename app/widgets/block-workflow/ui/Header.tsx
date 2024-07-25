import React from "react";
import TrashIcon from "@/public/svg/trash-icon.svg";
import { RoleType } from "@/app/shared";
import { useModal } from "@/app/shared/modals/modal/ModalProvider";

type HeaderProps = {
  title: string;
  setFlag?: (value: boolean) => void;
  clientId?: number;
  roleType?: RoleType;
};

export const Header: React.FC<HeaderProps> = ({
  title,
  setFlag,
  roleType,
  clientId,
}) => {
  const { openModal } = useModal();

  const handleButtonClick = () => {
    openModal("removeWorkflowModal", {
      title,
      clientId,
      setFlag,
    });
  };

  return (
    <div className="flex flex-row justify-between items-center">
      <h3 className="text-gray text-sm font-normal max-w-2xl overflow-clip text-ellipsis text-nowrap">
        {title}
      </h3>
      {roleType === "Administrator" && (
        <button onClick={handleButtonClick}>
          <TrashIcon />
        </button>
      )}
    </div>
  );
};
