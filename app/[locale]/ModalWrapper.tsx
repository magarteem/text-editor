"use client";

import React, { PropsWithChildren } from "react";
import { ModalProvider } from "../shared/modals/modal/ModalProvider";
import { Modal } from "../shared/modals/modal/index";

export function ModalWrapper({ children }: PropsWithChildren<any>) {
  return (
    <ModalProvider>
      {children}
      <Modal />
    </ModalProvider>
  );
}
