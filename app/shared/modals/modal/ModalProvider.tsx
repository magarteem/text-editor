import React, { createContext, useState, useContext, ReactNode } from "react";

interface ModalState {
  isOpen: boolean;
  modalId: string | null;
  data?: any;
}

interface ModalContextType {
  modal: ModalState;
  openModal: (name: string, data?: any) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType>({
  modal: { isOpen: false, modalId: null, data: null },
  openModal: () => {},
  closeModal: () => {},
});

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    modalId: null,
    data: null,
  });

  const openModal = (name: string, data: any) => {
    setModal({ isOpen: true, modalId: name, data: data });
  };
  const closeModal = () =>
    setModal({ isOpen: false, modalId: null, data: null });

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => useContext(ModalContext);
