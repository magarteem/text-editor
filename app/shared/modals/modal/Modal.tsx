"use client";

import React, { useEffect } from "react";
import CrossIcon from "@/public/svg/close-icon.svg";
import { useModal } from "./ModalProvider";
import { CreateUserModalForm } from "../createUserModal";
import { SubmitTemplateModalForm } from "../submitTemplateModal";
import { RemoveUserModal } from "../removeUserModal";
import { RemoveWorkflowModal } from "../removeWorkflow";
import { CreateNewDirectoryModal } from "../сreateNewDirectoryModal";
import { VisibleStorageModal } from "../visibleStorageModal";
import { RemoveDirectoryModal } from "../removeDirectoryModal";
import cn from "classnames";
import {
  CreateNewDocumentModal,
  CreateNewDocumentModalAsLink,
} from "../сreateNewDocumentModal";
import { RenameDirectoryModal } from "../renameDirectoryModal";
import { RenameDocFileModal } from "../renameDocFileModal";
import VisibleStageModal from "../visibleStageModal/VisibleStageModal";
import { ForgotPassModal } from "../forgotPassModal";

export function Modal() {
  const { modal, closeModal } = useModal();

  useEffect(() => {
    const handleEsc = (event: any) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <>
      {modal.isOpen && (
        <div className="fixed left-0 top-0 w-full h-full overflow-auto flex justify-center items-center z-50">
          <div
            className="bg-gray opacity-50 w-full h-full relative"
            onClick={() => closeModal()}
          ></div>
          <div
            className={cn(
              "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
              modal.data?.classNames ? modal.data.classNames : "max-w-md"
            )}
          >
            <div
              className="bg-white z-10 p-8 relative"
              style={{ borderRadius: "32px" }}
            >
              <div className="flex flex-col items-center">
                <button
                  className={cn(
                    "absolute top-4 right-4",
                    modal.data?.classNamesClosed
                  )}
                  onClick={() => closeModal()}
                >
                  <CrossIcon />
                </button>
                {modal.modalId === "createUserModal" && (
                  <CreateUserModalForm data={modal.data} />
                )}
                {modal.modalId === "submitTemplate" && (
                  <SubmitTemplateModalForm data={modal.data} />
                )}
                {modal.modalId === "removeUserModal" && (
                  <RemoveUserModal data={modal.data} />
                )}
                {modal.modalId === "removeWorkflowModal" && (
                  <RemoveWorkflowModal data={modal.data} />
                )}
                {modal.modalId === "createNewDirectoryModal" && (
                  <CreateNewDirectoryModal data={modal.data} />
                )}
                {modal.modalId === "createNewDocumentModalAsLink" && (
                  <CreateNewDocumentModalAsLink data={modal.data} />
                )}
                {modal.modalId === "createNewDocumentModal" && (
                  <CreateNewDocumentModal data={modal.data} />
                )}
                {modal.modalId === "visibleStorageModal" && (
                  <VisibleStorageModal data={modal.data} />
                )}
                {modal.modalId === "removeDirectoryModal" && (
                  <RemoveDirectoryModal data={modal.data} />
                )}
                {modal.modalId === "renameDirectoryModal" && (
                  <RenameDirectoryModal data={modal.data} />
                )}
                {modal.modalId === "renameDocFileModal" && (
                  <RenameDocFileModal data={modal.data} />
                )}
                {modal.modalId === "visibleStageModal" && (
                  <VisibleStageModal data={modal.data} />
                )}
                {modal.modalId === "forgotPassModal" && (
                  <ForgotPassModal data={modal.data} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
