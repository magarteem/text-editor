import React, { useEffect } from "react";
import RowMoreIcon from "@/public/svg/row-more.svg";
import TrashIcon from "@/public/svg/trash-icon.svg";
import { useModal } from "@/app/shared/modals/modal/ModalProvider";
import { useProfileStore } from "@store/index";
import { useStore } from "zustand";

export function DeleteButton({
  id,
  fullName,
}: {
  id: number;
  fullName: string;
}) {
  const { openModal } = useModal();
  const profile = useStore(useProfileStore);

  useEffect(() => {
    const handleButtonClick = (event: any) => {
      event.stopPropagation();
      try {
        openModal("removeUserModal", { id: id, fullName: fullName });
      } catch (err: any) {
        console.error(err);
      }
    };

    const button = document.getElementById(`delete-user-${id}`);

    if (button) {
      button.addEventListener("click", handleButtonClick);
    }

    return () => {
      if (button) {
        button.removeEventListener("click", handleButtonClick);
      }
    };
  }, []);

  if (profile?.roleType !== "Administrator") return;

  return (
    <button
      type="button"
      className="group cursor-pointer"
      id={`delete-user-${id}`}
      onClick={() => openModal("removeUserModal")}
    >
      <RowMoreIcon className={"group-hover:hidden"} />
      <TrashIcon className={"group-hover:block hidden"} />
    </button>
  );
}
